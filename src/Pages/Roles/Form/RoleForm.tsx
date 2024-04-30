import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import RoleModel from '../../../Models/RoleModel';
import { deleteRole, getRoleById, saveRole } from '../../../Services/RoleService';
import './RoleForm.scss';
import { Toast } from 'primereact/toast';

export default function RoleForm() {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [role, setRole] = useState<RoleModel>(new RoleModel());
    const [roleName, setRoleName] = useState<string>();
    const params = useParams();

    useEffect(() => {
        if (params.id && Number(params.id) !== 0) {
            setLoading(true);
            getRoleById(params.id).then(response => {
                setRole(response);
                setRoleName(response.name);
                setLoading(false);
            });
        }
    }, [params.id])

    function setValue(value: string): void {
        setRoleName(value);
    }

    function handleFormSubmit(event: any) {
        setLoading(true);
        role.name = roleName;
        saveRole(role)
            .then(() => {
                setLoading(false);
                navigate('/role');
            }).catch((err) => {
                if (err.data.errorKey === 'NOT_EDITABLE') {
                    console.log('Item not editable');
                    toast.current?.show({
                        severity: 'error', summary: 'Error',
                        detail: 'This item is not editable.', life: 3000
                    });
                } else {
                    if (err.status === 403) {
                        toast.current?.show({ severity: 'error', summary: 'Forbidden', detail: `You don't have access to this resource.` });
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving the user. Please, contact support.' });
                    }
                }
            });
        event.preventDefault();
    }

    function acceptDelete() {
        if (role.id) {
            deleteRole(role.id)
                .then(() => navigate('/role'))
                .catch((err) => {
                    if (err.status === 403) {
                        toast.current?.show({ severity: 'error', summary: 'Forbidden', detail: `You don't have access to this resource.` });
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving the user. Please, contact support.' });
                    }
                });
        }
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

    return (
        <Layout>
            <div className="roleFormPage">
                <Card title={role?.name ? role.name : 'New Role'}>
                    <ConfirmDialog />
                    <Toast ref={toast} />
                    <form className="roleForm" onSubmit={handleFormSubmit}>
                        <span>Name:</span>
                        <InputText value={roleName} onChange={(e) => setValue(e.target.value)} />
                        <Button disabled={loading} label='Save'></Button>
                        <Button label="Delete" onClick={(e) => confirmDelete(e)} severity="danger"
                            style={{ marginLeft: '0.5em' }} disabled={role.id === undefined} />
                    </form>
                </Card>
            </div>
        </Layout>
    )
}