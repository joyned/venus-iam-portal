import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Card } from 'primereact/card';
import Layout from '../../../Layout/Layout';
import RoleModel from '../../../Models/RoleModel';
import './RoleForm.scss';
import { Button } from 'primereact/button';

export default function RoleForm() {
    const [role, setRole] = useState<RoleModel>();

    function setValue(value: string): void {
        console.log(value);
    }

    return (
        <Layout>
            <div className="roleFormPage">
                <Card title={role?.name ? role.name : 'New Role'}>
                    <form className="roleForm">
                        <span>Name:</span>
                        <InputText value={role?.name} onChange={(e) => setValue(e.target.value)} />
                        <Button label='Save'></Button>
                    </form>
                </Card>
            </div>
        </Layout>
    )
}