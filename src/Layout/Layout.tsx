import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.scss';

export default function Layout(props: { children?: any }) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
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
        <div className="layoutContent">
            <div className="leftMenu">
                <div className="content">
                    <div className="title">
                        <h1>Tenant</h1>
                        <div className="separator"></div>
                    </div>
                    <div className="menuList">
                        <span className='menuItem'>Home</span>
                        <span className='menuItem' onClick={() => { navigate('/about') }}>About</span>

                        <div className="separator"></div>
                        <span className="menuTitle">Management</span>
                        <span className='menuItem' onClick={() => { navigate('/user') }}>Users</span>
                        <span className='menuItem' onClick={() => { navigate('/role') }}>Roles</span>
                        <span className='menuItem' onClick={() => { navigate('/group') }}>Groups</span>
                        <span className='menuItem' onClick={() => { navigate('/client') }}>Clients</span>

                        <div className="separator"></div>
                        <span className="menuTitle">Settings</span>
                        <span className='menuItem' onClick={() => { navigate('/settings/auth') }}>Auth</span>
                    </div>
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