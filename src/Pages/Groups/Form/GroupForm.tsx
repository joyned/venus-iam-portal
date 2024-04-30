import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { PickList } from "primereact/picklist";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import GroupModel from "../../../Models/GroupModel";
import RoleModel from "../../../Models/RoleModel";
import {
  deleteGroup,
  getGroupById,
  saveGroup,
} from "../../../Services/GroupService";
import { getRoles } from "../../../Services/RoleService";
import "./GroupForm.scss";
import { filterByIdAndRemoveItems } from "../../../Utils/Utils";
import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

export default function GroupForm() {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState<string>();
  const [group, setGroup] = useState<GroupModel>(new GroupModel());
  const [roles, setRoles] = useState<RoleModel[]>();
  const [selectedRoles, setSelectedRoles] = useState<RoleModel[] | undefined>(
    [],
  );

  useEffect(() => {
    setLoading(true);
    getRoles().then((response: any) => {
      setRoles(response);
      if (params.id && Number(params.id) !== 0) {
        getGroupById(params.id).then((group: GroupModel) => {
          setGroup(group);
          setGroupName(group.name);
          setSelectedRoles(group.roles);
          setRoles(filterByIdAndRemoveItems(response, group.roles || []));
          setLoading(false);
        });
      }
    });
  }, [params.id]);

  function setName(value: string): void {
    setGroupName(value);
  }

  const onChange = (event: { source: any; target: any }) => {
    setRoles(event.source);
    setSelectedRoles(event.target);
  };

  const handleSubmit = (event: any) => {
    group.name = groupName;
    group.roles = selectedRoles;
    setLoading(true);
    saveGroup(group)
      .catch((err) => {
        if (err.data.errorKey === "NOT_EDITABLE") {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "This item is not editable.",
            life: 3000,
          });
        } else {
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
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
    if (group.id) {
      deleteGroup(group.id)
        .then(() => navigate("/group"))
        .catch((err) => {
          if (err.data.errorKey === "NOT_EDITABLE") {
            console.log("Item not editable");
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: "This item is not editable.",
              life: 3000,
            });
          } else {
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
          }
        });
    }
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
      <div className="groupFormPage">
        <ConfirmDialog />
        <Toast ref={toast} />
        <Card title={group?.name ? group.name : "New Group"}>
          <form className="groupForm" onSubmit={handleSubmit}>
            <span>Name</span>
            <InputText
              value={groupName}
              onChange={(e) => setName(e.target.value)}
            />
            <span>Roles</span>
            <PickList
              dataKey="id"
              source={roles}
              target={selectedRoles}
              onChange={onChange}
              itemTemplate={itemTemplate}
              breakpoint="1280px"
              sourceHeader="Available"
              targetHeader="Selected"
              sourceStyle={{ height: "24rem" }}
              targetStyle={{ height: "24rem" }}
            />
            <Button label="Save" disabled={loading}></Button>
            <Button
              label="Delete"
              onClick={(e) => confirmDelete(e)}
              severity="danger"
              style={{ marginLeft: "0.5em" }}
              disabled={group.id === undefined}
            />
          </form>
        </Card>
      </div>
    </Layout>
  );
}
