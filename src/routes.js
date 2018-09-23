import React from 'react';
import Loadable from 'react-loadable'

const Loading = () => (<div>Loading...</div>);

const Profile = Loadable({
    loader: () => import('./views/Profile'),
    loading: Loading,
})

const Dashboard = Loadable({
    loader: () => import('./views/Dashboard'),
    loading: Loading,
});

const Users = Loadable({
    loader: () => import('./views/Users/Users'),
    loading: Loading,
});

const UserEdit = Loadable({
    loader: () => import('./views/Users/Edit'),
    loading: Loading,
});

const UserCreate = Loadable({
    loader: () => import('./views/Users/Create'),
    loading: Loading,
});

const routes = [
    { path: '/', exact: true, name: 'Home', component: Dashboard },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/me', exact: true, name: 'Profile', component: Profile },
    { path: '/users', exact: true,  name: 'Users', component: Users },
    { path: '/users/create', exact: true,  name: 'Create', component: UserCreate },
    { path: '/users/:id', exact: true, name: 'Edit User', component: UserEdit },
];
export default routes;
