import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { PickList } from 'primereact/picklist';
import { SelectButton } from 'primereact/selectbutton';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import GroupModel from '../../../Models/GroupModel';
import UserModel from '../../../Models/UserModel';
import { getGroups } from '../../../Services/GroupService';
import { getUserById } from '../../../Services/UserService';
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
    const [user, setUser] = useState<UserModel>(new UserModel());
    const [groups, setGroups] = useState<GroupModel[]>([]);
    const [passwordOption, setPasswordOption] = useState();
    const [selectedGroups, setSelectedGroups] = useState<GroupModel[]>([]);

    const params = useParams();

    useEffect(() => {
        getGroups().then(groupsResponse => {
            setGroups(groupsResponse);
            if (params.id) {
                getUserById(params.id).then((response: any) => {
                    setUser(response);
                    setSelectedGroups(response.groups);
                    setGroups(filterByIdAndRemoveItems(groupsResponse, response.groups));
                });
            }
        });
    }, []);

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

    function save(e: any) {
        user.groups = selectedGroups;
        console.log(user);
        e.preventDefault();
    }

    return (
        <Layout>
            <div className="userEditPage">
                <Card title={user?.name ? user.name : 'New User'}>
                    <form className="userEditForm" onSubmit={save}>
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

                        <Button label='Save'></Button>
                    </form>
                </Card>
            </div>
        </Layout>
    )
}