import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { PickList } from 'primereact/picklist';
import { SelectButton } from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import GroupModel from '../../../Models/GroupModel';
import UserModel from '../../../Models/UserModel';
import { getGroups } from '../../../Services/GroupService';
import { deleteUser, getUserById, saveUser } from '../../../Services/UserService';
import { filterByIdAndRemoveItems } from '../../../Utils/Utils';
import './UserForm.scss';

const options = [
    {
        id: 'E',
        name: "Send via E-mail",
    },
    {
        id: 'O',
        name: "Set your own"
    }
]

export default function UserForm() {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserModel>(new UserModel());
    const [groups, setGroups] = useState<GroupModel[]>([]);
    const [passwordOption, setPasswordOption] = useState();
    const [selectedGroups, setSelectedGroups] = useState<GroupModel[]>([]);

    const params = useParams();

    useEffect(() => {
        setLoading(true)
        getGroups().then(groupsResponse => {
            setGroups(groupsResponse);
            if (params.id && Number(params.id) !== 0) {
                getUserById(params.id).then((response: any) => {
                    setUser(response);
                    setSelectedGroups(response.groups);
                    setGroups(filterByIdAndRemoveItems(groupsResponse, response.groups));
                    setLoading(false)
                });
            }
        });
    }, [params.id]);

    function setName(value: string): void {
        user.name = value;
    }

    function setEmail(value: string): void {
        user.email = value;
    }

    function setPassword(value: string): void {
        user.password = value;
    }

    const onChange = (event: { source: any; target: any; }) => {
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
        if (user.id) {
            deleteUser(user.id)
                .then(() => navigate('/user'))
                .catch((err) => {
                    if (err.status === 403) {
                        toast.current?.show({ severity: 'error', summary: 'Forbidden', detail: `You don't have access to this resource.` });
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving the user. Please, contact support.' });
                    }
                });
        }
    }

    function handleSubmit(e: any) {
        setLoading(true)
        user.groups = selectedGroups;
        saveUser(user)
            .then(() => navigate('/user'))
            .catch((error) => {
                if (error.status === 403) {
                    toast.current?.show({ severity: 'error', summary: 'Forbidden', detail: `You don't have access to this resource.` });
                } else {
                    toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving the user. Please, contact support.' });
                }
            }).finally(() => setLoading(false));
        e.preventDefault();
    }

    return (
        <Layout loading={loading}>
            <div className="userEditPage">
                <ConfirmDialog />
                <Toast ref={toast} />
                <Card title={user?.name ? user.name : 'New User'}>
                    <form className="userEditForm" onSubmit={handleSubmit}>
                        <div className="item">
                            <span>Name:</span>
                            <InputText value={user.name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="item">
                            <span>Email:</span>
                            <InputText type="email" value={user.email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {!user?.id && (
                            <div className="item">
                                <span>Password</span>
                                <SelectButton value={passwordOption} onChange={(e) => setPasswordOption(e.value)}
                                    options={options} optionLabel="name" optionValue="id" />
                            </div>
                        )}

                        {passwordOption === 'O' && (
                            <InputText type='password' value={user.password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter a password'></InputText>
                        )}

                        <div className="item">
                            <span>Groups:</span>
                            <PickList dataKey="id" source={groups} target={selectedGroups} onChange={onChange} itemTemplate={itemTemplate} breakpoint="1280px"
                                sourceHeader="Available" targetHeader="Selected" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }} />
                        </div>

                        <Button label='Save' disabled={loading}></Button>
                        <Button label="Delete" onClick={(e) => confirmDelete(e)} severity="danger"
                            style={{ marginLeft: '0.5em' }} disabled={user.id === undefined} />
                    </form>
                </Card>
            </div>
        </Layout>
    )
}