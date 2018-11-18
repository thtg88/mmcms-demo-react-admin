import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => (<div>Loading...</div>);

const Profile = Loadable({
    loader: () => import('./views/Pages/Profile'),
    loading: Loading,
})

const Dashboard = Loadable({
    loader: () => import('./views/Dashboard'),
    loading: Loading,
});

// Roles Loadables...
const Roles = Loadable({
    loader: () => import('./views/Resources/Roles/List'),
    loading: Loading,
});
const RoleEdit = Loadable({
    loader: () => import('./views/Resources/Roles/Edit'),
    loading: Loading,
});
const RoleCreate = Loadable({
    loader: () => import('./views/Resources/Roles/Create'),
    loading: Loading,
});

// Users Loadables...
const Users = Loadable({
    loader: () => import('./views/Resources/Users/List'),
    loading: Loading,
});
const UserEdit = Loadable({
    loader: () => import('./views/Resources/Users/Edit'),
    loading: Loading,
});
const UserCreate = Loadable({
    loader: () => import('./views/Resources/Users/Create'),
    loading: Loading,
});

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
