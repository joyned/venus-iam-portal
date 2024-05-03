import { createBrowserRouter } from "react-router-dom";
import Client from "./Pages/Clients/Client";
import GroupForm from "./Pages/Groups/Form/GroupForm";
import Group from "./Pages/Groups/Group";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import RoleForm from "./Pages/Roles/Form/RoleForm";
import Role from "./Pages/Roles/Role";
import AuthSettings from "./Pages/Settings/AuthSettings";
import UserForm from "./Pages/Users/Form/UserForm";
import User from "./Pages/Users/User";
import About from "./Pages/About/About";
import ClientForm from "./Pages/Clients/Form/ClientForm";
import Guard from "./Security/Guard";
import IAMLogin from "./Pages/IAMLogin/IAMLogin";
import TenantSettings from "./Pages/Settings/TenantSettings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>,
    },
    {
        path: "/home",
        element: (
            <Guard>
                <Home></Home>
            </Guard>
        ),
    },
    {
        path: "/about",
        element: (
            <Guard>
                <About></About>
            </Guard>
        ),
    },
    {
        path: "/user",
        element: (
            <Guard>
                {" "}
                <User></User>
            </Guard>
        ),
    },
    {
        path: "/user/:id",
        element: (
            <Guard>
                <UserForm></UserForm>
            </Guard>
        ),
    },
    {
        path: "/role",
        element: (
            <Guard>
                <Role></Role>
            </Guard>
        ),
    },
    {
        path: "/role/:id",
        element: (
            <Guard>
                <RoleForm></RoleForm>
            </Guard>
        ),
    },
    {
        path: "/group",
        element: (
            <Guard>
                <Group></Group>
            </Guard>
        ),
    },
    {
        path: "/group/:id",
        element: (
            <Guard>
                <GroupForm></GroupForm>
            </Guard>
        ),
    },
    {
        path: "/client",
        element: (
            <Guard>
                <Client></Client>
            </Guard>
        ),
    },
    {
        path: "/client/:id",
        element: (
            <Guard>
                <ClientForm></ClientForm>
            </Guard>
        ),
    },
    {
        path: "/settings",
        children: [
            {
                path: "auth",
                element: (
                    <Guard>
                        <AuthSettings></AuthSettings>
                    </Guard>
                ),
            },
            {
                path: "tenant",
                element: (
                    <Guard>
                        <TenantSettings></TenantSettings>
                    </Guard>
                ),
            },
        ],
    },
    {
        path: "/iamLogin",
        element: <IAMLogin></IAMLogin>,
    },
]);