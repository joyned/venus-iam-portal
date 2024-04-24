import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import GroupModel from '../../Models/GroupModel';
import { getGroups } from '../../Services/GroupService';
import './Group.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


export default function Group() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<GroupModel[]>();

    useEffect(() => {
        getGroups().then((response) => {
            setGroups(response);
        });
    }, []);

    return (
        <Layout>
            <div className="groupPage">
                <Card title='Group Management'>
                    <div className="groupDescription">
                        <p>Welcome to the Group Management page for your tenant. Here, you can view and manage the groups within your account.</p>
                        <p>Below is the list of groups currently available in your tenant. Each group has its name and a brief description.</p>
                        <p>To edit a group's details, simply click on the group name in the list. You'll be directed to a page where you can modify the group's name, description, and members.</p>
                    </div>
                    <DataTable value={groups} tableStyle={{ width: '100%' }}>
                        <Column field="id" header="ID"></Column>
                        <Column field="name" header="Group Name"></Column>
                        <Column field="roles.length" header="Roles In"></Column>
                        <Column field="createdAt" header="Created At"></Column>
                    </DataTable>
                    <Button label='Add' onClick={() => navigate('/group/0')}></Button>
                </Card>
            </div>
        </Layout>
    )
}