import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Chips, ChipsChangeEvent } from 'primereact/chips';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import ClientAllowedUrlModel from '../../../Models/ClientAllowedUrlModel';
import ClientModel from '../../../Models/ClientModel';
import { deleteClient, getClientById, saveClient } from '../../../Services/ClientService';
import './ClientForm.scss';
import { Password } from 'primereact/password';

export default function ClientForm() {
    const navigate = useNavigate();
    const params = useParams();
    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState(false);
    const [client, setClient] = useState<ClientModel>(new ClientModel());
    const [clientName, setClientName] = useState<string>();
    const [clientUrl, setClientUrl] = useState<string>();
    const [clientAllowedUrls, setClientAllowedUrls] = useState<any[]>([]);
    const [clientId, setClientId] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>();

    useEffect(() => {
        if (params.id && Number(params.id) !== 0) {
            setLoading(true);
            getClientById(params.id).then((response: any) => {
                const allUrls = response.allowedUrls.map((au: ClientAllowedUrlModel) => au.url);
                setClient(response);
                setClientId(response.id)
                setClientName(response.name);
                setClientUrl(response.url);
                setAllowedUrls(allUrls);
                setClientId(response.clientId);
                setClientSecret(response.clientSecret);
                setLoading(false)
            }).finally(() => setLoading(false));
        }
    }, [params.id])

    const handleSubmit = (event: any) => {
        setLoading(true);
        client.allowedUrls = clientAllowedUrls.map((url: string) => {
            let allowed = new ClientAllowedUrlModel();
            allowed.clientId = client.id;
            allowed.url = url;
            return allowed;
        });

        client.name = clientName;
        client.url = clientUrl;

        saveClient(client)
            .then(() => navigate('/client'))
            .finally(() => setLoading(false));

        event.preventDefault();
    }

    const confirmDelete = (e: any) => {
        e.preventDefault();
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: acceptDelete
        });
    };

    const acceptDelete = () => {
        if (client.id) {
            deleteClient(client.id)
                .then(() => navigate('/client'))
                .catch((err) => {
                    toast.current?.show({
                        severity: 'error', summary: 'Error',
                        detail: 'An error occured. Please, contact support.', life: 3000
                    });
                });
        }
    }

    const setAllowedUrls = (value: any) => {
        try {
            new URL(value.at(-1));
            setClientAllowedUrls(value);
        } catch (error) {
            toast.current?.show({
                severity: 'error', summary: 'Error',
                detail: `Invalid URL ${value.at(-1)}. Please, check your input.`, life: 3000
            });
        }
    }

    const copyToClipboard = (e: any) => {
        if (clientSecret) {
            navigator.clipboard.writeText(clientSecret)
        }
        e.preventDefault();
    }

    return (
        <Layout>
            <div className="clientFormPage">
                <ConfirmDialog />
                <Toast ref={toast} />
                <Card title={client?.name ? client.name : 'New Client'}>
                    <form className="   " onSubmit={handleSubmit}>
                        <span>Name:</span>
                        <InputText value={clientName} onChange={(e) => setClientName(e.target.value)} />
                        <span>URL:</span>
                        <InputText value={clientUrl} onChange={(e) => setClientUrl(e.target.value)} />
                        <span>Client ID:</span>
                        <InputText value={clientId} disabled={true} />
                        <span>Client Secret:</span>
                        {clientSecret && (
                            <div>
                                <Password value={clientSecret} disabled={true} style={{ width: '90%', marginRight: '20px' }} />
                                <Button icon="pi pi-copy" onClick={(e) => copyToClipboard(e)}></Button>
                            </div>
                        )}
                        <span>Allowed URLs:</span>
                        {clientAllowedUrls && (
                            <div className="card p-fluid">
                                <Chips value={clientAllowedUrls} onChange={(e: ChipsChangeEvent) => setAllowedUrls(e.value)} />
                            </div>
                        )}
                        <Button label='Save' disabled={loading}></Button>
                        <Button label="Delete" onClick={(e) => confirmDelete(e)} severity="danger"
                            style={{ marginLeft: '0.5em' }} disabled={client.id === undefined} />
                    </form>
                </Card>
            </div>
        </Layout>
    )
}