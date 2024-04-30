import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import GroupModel from "../../Models/GroupModel";
import { getGroups } from "../../Services/GroupService";
import "./Group.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FaPencil } from "react-icons/fa6";

export default function Group() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<GroupModel[]>();

  useEffect(() => {
    setLoading(true);
    getGroups()
      .then((response) => {
        setGroups(response);
      })
      .finally(() => setLoading(false));
  }, []);

  const editTemplate = (rowData: any, column: any) => {
    return (
      <div style={{ cursor: "pointer" }}>
        <FaPencil onClick={() => navigate(`/group/${rowData.id}`)}></FaPencil>
      </div>
    );
  };

  return (
    <Layout>
      <div className="groupPage">
        <Card title="Group Management">
          <div className="groupDescription">
            <p>
              Welcome to the Group Management page for your tenant. Here, you
              can view and manage the groups within your account.
            </p>
            <p>
              Below is the list of groups currently available in your tenant.
              Each group has its name and a brief description.
            </p>
            <p>
              To edit a group's details, simply click on the group name in the
              list. You'll be directed to a page where you can modify the
              group's name, description, and members.
            </p>
          </div>
          <DataTable
            value={groups}
            tableStyle={{ width: "100%" }}
            loading={loading}
          >
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Group Name"></Column>
            <Column field="roles.length" header="Roles In"></Column>
            <Column field="createdAt" header="Created At"></Column>
            <Column header="Actions" body={editTemplate}></Column>
          </DataTable>
          <Button label="Add" onClick={() => navigate("/group/0")}></Button>
        </Card>
      </div>
    </Layout>
  );
}
