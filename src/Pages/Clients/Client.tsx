import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import ClientModel from '../../Models/ClientModel';
import { getClients } from '../../Services/ClientService';
import { Button } from 'primereact/button';
import './Client.scss';

export default function Client() {
    const [clients, setClients] = useState<ClientModel[]>();

    useEffect(() => {
        getClients().then((response) => {
            setClients(response);
        });
    }, []);

    return (
        <Layout>
            <div className="clientPage">
                <Card title='Client Management'>
                    <div className="clientDescription">
                        <p>Welcome to the Client Management page for your tenant. Here, you can view and manage the clients associated with your account.</p>
                        <p>Below is the list of clients currently registered in your tenant. Each client has its name, country, and other relevant information.</p>
                        <p>To edit a client's details, simply click on the client's name in the list. You'll be directed to a page where you can modify the client's name, country, and other details as needed.</p>
                    </div>
                    <DataTable value={clients} tableStyle={{ width: '100%' }}>
                        <Column field="id" header="ID"></Column>
                        <Column field="name" header="Client Name"></Column>
                        <Column field="url" header="URL"></Column>
                        <Column field="createdAt" header="Created At"></Column>
                    </DataTable>
                    <Button label='Add'></Button>
                </Card>
            </div>
        </Layout>
    )
}