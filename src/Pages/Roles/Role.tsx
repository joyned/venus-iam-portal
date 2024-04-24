import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import Layout from '../../Layout/Layout';
import './Role.scss';
import { getRoles } from '../../Services/RoleService';
import RoleModel from '../../Models/RoleModel';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


export default function Role() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState<RoleModel[]>();

    useEffect(() => {
        getRoles().then((response) => {
            setRoles(response);
        });
    }, []);

    return (
        <Layout>
            <div className="rolePage">
                <Card title='Role Management'>
                    <div className="roleDescription">
                        <p>Welcome to the Role Management page for your tenant. Here, you can view and manage the roles assigned to users within your account.</p>
                        <p>Below is the list of roles currently available in your tenant. Each role has its name and a brief description.</p>
                        <p>To edit a role's details, simply click on the role name in the list. You'll be directed to a page where you can modify the role's name, description, and permissions.</p>
                    </div>
                    <DataTable value={roles} tableStyle={{ width: '100%' }}>
                        <Column field="id" header="ID"></Column>
                        <Column field="name" header="Role Name"></Column>
                        <Column field="groupsIn" header="In Groups"></Column>
                        <Column field="createdAt" header="Created At"></Column>
                    </DataTable>
                    <Button label='Add' onClick={() => navigate('/role/0')}></Button>
                </Card>
            </div>
        </Layout>
    )
}