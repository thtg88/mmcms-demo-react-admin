import { lazy } from 'react';

const Profile = lazy(() => import('./views/Pages/Profile'));

const Dashboard = lazy(() => import('./views/Dashboard'));

// Roles Loadables...
const Roles = lazy(() => import('./views/Resources/Roles/List'));
const RoleEdit = lazy(() => import('./views/Resources/Roles/Edit'));
const RoleCreate = lazy(() => import('./views/Resources/Roles/Create'));

// Users Loadables...
const Users = lazy(() => import('./views/Resources/Users/List'));
const UserEdit = lazy(() => import('./views/Resources/Users/Edit'));
const UserCreate = lazy(() => import('./views/Resources/Users/Create'));

const routes = [
    { path: '/', exact: true, name: 'Home', component: Dashboard },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/me', exact: true, name: 'Profile', component: Profile },
    { path: '/roles', exact: true,  name: 'Roles', component: Roles },
    { path: '/roles/create', exact: true,  name: 'Create', component: RoleCreate },
    { path: '/roles/:id', exact: true, name: 'Edit Role', component: RoleEdit },
    { path: '/users', exact: true,  name: 'Users', component: Users },
    { path: '/users/create', exact: true,  name: 'Create', component: UserCreate },
    { path: '/users/:id', exact: true, name: 'Edit User', component: UserEdit },
];

export default routes;
