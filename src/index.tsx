import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.scss';
import Client from './Pages/Clients/Client';
import GroupForm from './Pages/Groups/Form/GroupForm';
import Group from './Pages/Groups/Group';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RoleForm from './Pages/Roles/Form/RoleForm';
import Role from './Pages/Roles/Role';
import AuthSettings from './Pages/Settings/AuthSettings';
import UserForm from './Pages/Users/Form/UserForm';
import User from './Pages/Users/User';
import reportWebVitals from './reportWebVitals';
import About from './Pages/About/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: '/home',
    element: <Home></Home>
  },
  {
    path: '/about',
    element: <About></About>
  },
  {
    path: '/user',
    element: <User></User>,
  },
  {
    path: '/user/:id',
    element: <UserForm></UserForm>
  },
  {
    path: '/role',
    element: <Role></Role>
  },
  {
    path: '/role/:id',
    element: <RoleForm></RoleForm>
  },
  {
    path: '/group',
    element: <Group></Group>
  },
  {
    path: '/group/:id',
    element: <GroupForm></GroupForm>
  },
  {
    path: '/client',
    element: <Client></Client>
  },
  {
    path: '/settings',
    children: [
      {
        path: 'auth',
        element: <AuthSettings></AuthSettings>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
