import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import ClientModel from "../../Models/ClientModel";
import { getClients } from "../../Services/ClientService";
import "./Client.scss";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Client() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientModel[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getClients()
      .then((response) => {
        setClients(response);
      })
      .finally(() => setLoading(false));
  }, []);

  const editTemplate = (rowData: any, column: any) => {
    return (
      <div style={{ cursor: "pointer" }}>
        <FaPencil onClick={() => navigate(`/client/${rowData.id}`)}></FaPencil>
      </div>
    );
  };

  return (
    <Layout>
      <div className="clientPage">
        <Card title="Client Management">
          <div className="clientDescription">
            <p>
              Welcome to the Client Management page for your tenant. Here, you
              can view and manage the clients associated with your account.
            </p>
            <p>
              Below is the list of clients currently registered in your tenant.
              Each client has its name, country, and other relevant information.
            </p>
            <p>
              To edit a client's details, simply click on the client's name in
              the list. You'll be directed to a page where you can modify the
              client's name, country, and other details as needed.
            </p>
          </div>
          <DataTable
            value={clients}
            tableStyle={{ width: "100%" }}
            loading={loading}
          >
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Client Name"></Column>
            <Column field="url" header="URL"></Column>
            <Column field="createdAt" header="Created At"></Column>
            <Column header="Actions" body={editTemplate}></Column>
          </DataTable>
          <Button label="Add" onClick={() => navigate("/client/0")}></Button>
        </Card>
      </div>
    </Layout>
  );
}
