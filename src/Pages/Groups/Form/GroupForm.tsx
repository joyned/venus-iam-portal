import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { PickList } from 'primereact/picklist';
import { useEffect, useState } from 'react';
import Layout from '../../../Layout/Layout';
import GroupModel from '../../../Models/GroupModel';
import RoleModel from '../../../Models/RoleModel';
import { getRoles } from '../../../Services/RoleService';
import './GroupForm.scss';

export default function GroupForm() {
    const [group, setGroup] = useState<GroupModel>(new GroupModel());
    const [roles, setRoles] = useState<RoleModel[]>();
    const [selectedRoles, setSelectedRoles] = useState([])

    useEffect(() => {
        getRoles().then((response) => {
            setRoles(response);
        });

        // Set to selectedRoles all the roles that Group has.
    }, [])

    function setValue(value: string): void {
        console.log(value);
    }

    const onChange = (event: { source: any; target: any; }) => {
        setRoles(event.source);
        setSelectedRoles(event.target);
    };

    const itemTemplate = (item: any) => {
        return (
            <div className="flex flex-wrap p-2 items-center gap-3">
                <span className="font-bold">{item.name}</span>
            </div>
        );
    };

    return (
        <Layout>
            <div className="groupFormPage">
                <Card title={group?.name ? group.name : 'New Group'}>
                    <form className="groupForm">
                        <span>Name</span>
                        <InputText value={group?.name} onChange={(e) => setValue(e.target.value)} />
                        <span>Roles</span>
                        <PickList dataKey="id" source={roles} target={selectedRoles} onChange={onChange} itemTemplate={itemTemplate} breakpoint="1280px"
                            sourceHeader="Available" targetHeader="Selected" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }} />
                    </form>
                </Card>
            </div>
        </Layout>
    )
}