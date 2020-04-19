import { lazy } from 'react';
import { noInternetConnectionNotification } from './helpers/toastNotification';

const Profile = lazy(() => retry(() => import('./views/Pages/Profile')));
const Dashboard = lazy(() => retry(() => import('./views/Dashboard')));

// Content Migration Method lazies...
const ContentMigrationMethodCreate = lazy(() => retry(() => import('./views/Resources/ContentMigrationMethods/Create')));
const ContentMigrationMethodEdit = lazy(() => retry(() => import('./views/Resources/ContentMigrationMethods/Edit')));
const ContentMigrationMethodList = lazy(() => retry(() => import('./views/Resources/ContentMigrationMethods/List')));

// Image Category lazies...
const ImageCategoryCreate = lazy(() => retry(() => import('./views/Resources/ImageCategories/Create')));
const ImageCategoryEdit = lazy(() => retry(() => import('./views/Resources/ImageCategories/Edit')));
const ImageCategoriesList = lazy(() => retry(() => import('./views/Resources/ImageCategories/List')));

// Roles lazies...
const RolesList = lazy(() => retry(() => import('./views/Resources/Roles/List')));
const RoleEdit = lazy(() => retry(() => import('./views/Resources/Roles/Edit')));
const RoleCreate = lazy(() => retry(() => import('./views/Resources/Roles/Create')));

// Users lazies...
const UsersList = lazy(() => retry(() => import('./views/Resources/Users/List')));
const UserEdit = lazy(() => retry(() => import('./views/Resources/Users/Edit')));
const UserCreate = lazy(() => retry(() => import('./views/Resources/Users/Create')));

const routes = [
    { path: '/', exact: true, name: 'Home', component: Dashboard },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/me', exact: true, name: 'Profile', component: Profile },
    { path: '/content-migration-methods', exact: true,  name: 'Content Migration Methods', component: ContentMigrationMethodList },
    { path: '/content-migration-methods/create', exact: true,  name: 'Create', component: ContentMigrationMethodCreate },
    { path: '/content-migration-methods/:id', exact: true, name: 'Edit Migration Method', component: ContentMigrationMethodEdit },
    { path: '/image-categories', exact: true,  name: 'Image Categories', component: ImageCategoriesList },
    { path: '/image-categories/create', exact: true,  name: 'Create', component: ImageCategoryCreate },
    { path: '/image-categories/:id', exact: true, name: 'Edit Role', component: ImageCategoryEdit },
    { path: '/roles', exact: true,  name: 'Roles', component: RolesList },
    { path: '/roles/create', exact: true,  name: 'Create', component: RoleCreate },
    { path: '/roles/:id', exact: true, name: 'Edit Role', component: RoleEdit },
    { path: '/users', exact: true,  name: 'Users', component: UsersList },
    { path: '/users/create', exact: true,  name: 'Create', component: UserCreate },
    { path: '/users/:id', exact: true, name: 'Edit User', component: UserEdit },
];

export default routes;

/**
 * Credits to https://dev.to/goenning/how-to-retry-when-react-lazy-fails-mb5
 */
const retry = (fn, retriesLeft = 5, interval = 1000) => {
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch((error) => {
                setTimeout(() => {
                    if (retriesLeft === 1) {
                        // maximum retries exceeded
                        noInternetConnectionNotification();
                        return;
                    }

                    // Passing on "reject" is the important part
                    retry(fn, retriesLeft - 1, interval).then(resolve, reject);
                }, interval);
            });
    });
}
