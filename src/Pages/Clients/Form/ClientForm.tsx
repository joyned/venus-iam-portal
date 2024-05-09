import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { PickList } from "primereact/picklist";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../../../Components/ImageUpload/ImageUpload";
import Layout from "../../../Layout/Layout";
import ClientAllowedUrlModel from "../../../Models/ClientAllowedUrlModel";
import ClientModel from "../../../Models/ClientModel";
import GroupModel from "../../../Models/GroupModel";
import {
  deleteClient,
  getClientById,
  saveClient,
} from "../../../Services/ClientService";
import { getGroups } from "../../../Services/GroupService";
import "./ClientForm.scss";
import { filterByIdAndRemoveItems } from "../../../Utils/Utils";

export default function ClientForm() {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<GroupModel[]>([]);
  const [client, setClient] = useState<ClientModel>(new ClientModel());
  const [clientName, setClientName] = useState<string>();
  const [clientUrl, setClientUrl] = useState<string>();
  const [clientAllowedUrls, setClientAllowedUrls] = useState<string[]>([]);
  const [clientId, setClientId] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>();
  const [clientImage, setClientImage] = useState<string>();
  const [selectedGroups, setSelectedGroups] = useState<GroupModel[]>([]);

  useEffect(() => {
    setLoading(true);
    getGroups().then((groupsResponse: GroupModel[]) => {
      setGroups(groupsResponse);
      if (params.id && Number(params.id) !== 0) {
        getClientById(params.id)
          .then((response: any) => {
            setClient(response);
            setClientId(response.id);
            setClientName(response.name);
            setClientUrl(response.url);
            setAllowedUrls(
              response.allowedUrls.map((au: any) => {
                return au;
              }),
            );
            setSelectedGroups(response.allowedGroups);
            setGroups(filterByIdAndRemoveItems(groupsResponse, response.allowedGroups))
            setClientId(response.clientId);
            setClientSecret(response.clientSecret);
            setClientImage(response.image);
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    });
  }, [params.id]);

  const handleSubmit = (event: any) => {
    setLoading(true);
    client.allowedUrls = clientAllowedUrls.map((url: string) => {
      let allowed = new ClientAllowedUrlModel();
      allowed.url = url;
      return allowed;
    });

    client.allowedGroups = selectedGroups;
    client.name = clientName;
    client.url = clientUrl;
    client.image = clientImage;

    saveClient(client)
      .then(() => navigate("/client"))
      .catch((err) => {
        if (err.status === 403) {
          toast.current?.show({
            severity: "error",
            summary: "Forbidden",
            detail: `You don't have access to this resource.`,
          });
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail:
              "An error occurred while saving the user. Please, contact support.",
          });
        }
      })
      .finally(() => setLoading(false));
    event.preventDefault();
  };

  const confirmDelete = (e: any) => {
    e.preventDefault();
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: acceptDelete,
    });
  };

  const acceptDelete = () => {
    if (client.id) {
      setLoading(true);
      deleteClient(client.id)
        .then(() => navigate("/client"))
        .catch((err) => {
          if (err.status === 403) {
            toast.current?.show({
              severity: "error",
              summary: "Forbidden",
              detail: `You don't have access to this resource.`,
            });
          } else {
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail:
                "An error occurred while saving the user. Please, contact support.",
            });
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const setAllowedUrls = (value: any) => {
    try {
      new URL(value.at(-1));
      setClientAllowedUrls(value);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Invalid URL ${value.at(-1)}. Please, check your input.`,
        life: 3000,
      });
    }
  };

  const copyToClipboard = (e: any, value?: string) => {
    if (value) {
      navigator.clipboard.writeText(value);
    }
    e.preventDefault();
  };

  const onChange = (event: { source: any; target: any }) => {
    setGroups(event.source);
    setSelectedGroups(event.target);
  };

  const itemTemplate = (item: any) => {
    return (
      <div className="flex flex-wrap p-2 items-center gap-3">
        <span className="font-bold">{item.name}</span>
      </div>
    );
  };

  return (
    <Layout loading={loading}>
      <div className="clientFormPage">
        <ConfirmDialog />
        <Toast ref={toast} />
        <Card title={client?.name ? client.name : "New Client"}>
          <form className="   " onSubmit={handleSubmit}>
            <span>Name:</span>
            <InputText
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <span>URL:</span>
            <InputText
              value={clientUrl}
              onChange={(e) => setClientUrl(e.target.value)}
            />
            <span>Image:</span>
            <ImageUpload
              value={clientImage}
              onChange={(image: string) => setClientImage(image)}
            ></ImageUpload>
            {clientId && (
              <div>
                <span>Client ID:</span>
                <InputText
                  value={clientId}
                  disabled={true}
                  style={{ width: "95%", marginRight: "20px" }}
                />
                <Button
                  icon="pi pi-copy"
                  onClick={(e) => copyToClipboard(e, clientId)}
                ></Button>
              </div>
            )}
            {clientSecret && (
              <div>
                <span>Client Secret:</span>
                <Password
                  value={clientSecret}
                  disabled={true}
                  style={{ width: "95%", marginRight: "20px" }}
                />
                <Button
                  icon="pi pi-copy"
                  onClick={(e) => copyToClipboard(e, clientSecret)}
                ></Button>
              </div>
            )}
            <span>Allowed URLs:</span>
            {clientAllowedUrls && (
              <div className="card p-fluid">
                <Chips
                  value={clientAllowedUrls}
                  onChange={(e: ChipsChangeEvent) => setAllowedUrls(e.value)}
                />
              </div>
            )}

            <div style={{ marginTop: '30px' }}>
              <span>Allowed Groups:</span>
              <PickList
                dataKey="id"
                source={groups}
                target={selectedGroups}
                onChange={onChange}
                itemTemplate={itemTemplate}
                breakpoint="1280px"
                sourceHeader="Available"
                targetHeader="Selected"
                sourceStyle={{ height: "24rem" }}
                targetStyle={{ height: "24rem" }}
                style={{ marginTop: '20px' }}
              />
            </div>

            <Button label="Save" disabled={loading}></Button>
            <Button
              label="Delete"
              onClick={(e) => confirmDelete(e)}
              severity="danger"
              style={{ marginLeft: "0.5em" }}
              disabled={client.id === undefined}
            />
          </form>
        </Card>
      </div>
    </Layout>
  );
}
