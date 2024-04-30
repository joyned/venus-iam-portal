import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.scss';

export default function Layout(props: { children?: any, loading?: boolean }) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const menuSideLeftItems: MenuItem[] = [
        {
            template: () => {
                return (
                    <div className="title">
                        <h1>TENANT</h1>
                    </div>
                );
            }
        },
        {
            separator: true
        },
        { label: 'Home', icon: 'pi pi-home' },
        {
            label: 'About',
            icon: 'pi pi-search',
            command: () => navigate('/about')
        },
        {
            label: 'Management',
            items:
                [
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-user',
                        command: () => navigate('/user')
                    },
                    {
                        label: 'Roles',
                        icon: 'pi pi-fw pi-id-card',
                        command: () => navigate('/role')
                    },
                    {
                        label: 'Groups',
                        icon: 'pi pi-fw pi-users',
                        command: () => navigate('/group')
                    },
                    {
                        label: 'Clients',
                        icon: 'pi pi-fw pi-desktop',
                        command: () => navigate('/client')
                    }
                ]
        },
        {
            label: 'Settings',
            items:
                [
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        command: () => navigate('/settings/auth')
                    },
                ]
        }
    ]

    const menuUserTopBar = useRef<Menu>(null);
    const menuUserItems: MenuItem[] = [
        {
            label: user.name,
            items: [
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        navigate('/')
                    }
                }
            ]
        }
    ];


    const navigate = useNavigate();
    return (
        <div className="layoutContent" >
            {props.loading && (
                <div className="loadingOverlay">
                    <i className="pi pi-spin pi-spinner"></i>
                </div>
            )}
            <div className="leftMenu">
                <div className="content">
                    <Menu model={menuSideLeftItems} className='leftMenuContent' />
                </div>
            </div>
            <div className="topMenu">
                <Menu model={menuUserItems} popup ref={menuUserTopBar} id="popup_menu_left" />
                <div className="content">
                    <div className="settings">
                        <Button text icon="pi pi-cog" className="mr-2"
                            aria-controls="popup_menu_left" aria-haspopup
                            style={{ color: '#64748B' }} />
                    </div>
                    <div className="user">
                        <Menu model={menuUserItems} popup ref={menuUserTopBar} id="popup_menu_left" />
                        <Button text icon="pi pi-user" className="mr-2"
                            onClick={(event) => menuUserTopBar.current?.toggle(event)}
                            aria-controls="popup_menu_left" aria-haspopup
                            style={{ color: '#64748B' }} />
                    </div>
                </div>
            </div>
            <div className="principal">
                {props.children}
            </div>
        </div >
    )
}