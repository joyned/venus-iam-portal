import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import UserModel from '../../Models/UserModel';
import { getUsers } from '../../Services/UserService';
import './User.scss';


export default function User() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserModel[]>();

    useEffect(() => {
        getUsers().then((response: any) => {
            setUsers(response);
        });
    }, []);

    const editUserTemplate = (rowData: any, column: any) => {
        return <div style={{ cursor: 'pointer' }}>
            <FaPencil onClick={() => navigate(`/user/${rowData.id}`)}></FaPencil>
        </div>;
    }

    return (
        <Layout>
            <div className="usersPage">
                <Card title='User Management'>
                    <div className="pageDescription">
                        <p>Welcome to the User Management page for your tenant. Here, you can view and edit the list of users associated with your account.</p>
                        <p>Below is the list of users currently registered in your tenant. You can see their names, email addresses, and other relevant information.</p>
                        <p>To edit a user's information, simply click on their ID in the list. You'll be taken to a page where you can update their details, such as name, email, and role.</p>
                    </div>
                    <DataTable value={users} tableStyle={{ width: '100%' }}>
                        <Column field="id" header="ID"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="email" header="E-mail"></Column>
                        <Column field="createdAt" header="Created At"></Column>
                        <Column header='Actions' body={editUserTemplate}></Column>
                    </DataTable>
                    <Button label='Add' onClick={() => navigate('/user/0')}></Button>
                </Card>
            </div>
        </Layout>
    )
}