import { useNavigate } from 'react-router-dom';
import './Layout.scss'
import { FaCircleUser } from "react-icons/fa6";

export default function Layout(props: { children?: any }) {
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
                <div className="content">
                    <div className="settings">
                        <i className="pi pi-cog"></i>
                    </div>
                    <div className="user">
                        <FaCircleUser />
                    </div>
                </div>
            </div>
            <div className="principal">
                {props.children}
            </div>
        </div >
    )
}