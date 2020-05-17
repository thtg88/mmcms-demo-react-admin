import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
import {
    reducerName as rolesReducerName,
    selectOptionText as roleSelectOptionText,
    selectOptionValue as roleSelectOptionValue,
} from '../roles/schema';
import { getAllResources as getAllRoles } from '../roles/actions';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'User';

export const resourcesDisplayName = 'Users';

export const resourceBaseRoute = 'users';

export const keyField = 'id';

export const nameField = 'email';

export const roleValuesFetcher = {
    reducerName: rolesReducerName,
    fetcher: getAllRoles,
    fetcherName: 'getAllRoles',
};

export const columns = [
    {
        dataField: 'email',
        text: 'Email',
        className: 'col-md-12 col-12',
    },
    {
        dataField: 'id',
        text: 'ID',
        className: 'col-md-3 col-12',
    },
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-5 col-12',
    },
    {
        dataField: 'role.display_name',
        text: 'Role',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'created_at',
        text: 'Registered',
        className: 'col-md-12',
        formatter: (created_at) => `${getFullDateText(created_at)} ${getTimeText(created_at)}`,
    }
];

export const filters = [
    {
        disabled: false,
        emptyOption: 'Filter by Role',
        label: 'Role',
        name: 'role_id',
        operator: '=',
        selectOptionText: roleSelectOptionText,
        selectOptionValue: roleSelectOptionValue,
        type: 'select',
        value: '',
        values: [],
        valuesFetcher: {...roleValuesFetcher},
    },
];

export const sortingOptions = [
    {
        display_name: 'Name',
        name: 'name',
        direction: 'asc',
    },
    {
        display_name: 'Name',
        name: 'name',
        direction: 'desc',
    },
    {
        display_name: 'Email',
        name: 'email',
        direction: 'asc',
    },
    {
        display_name: 'Email',
        name: 'email',
        direction: 'desc',
    },
];

export const defaultSortingOption = {...sortingOptions[0]};

const searchColumns = [
    'Name',
    'Email Address',
];

export const searchTextInputPlaceholder = `Search by ${searchColumns.join(', or ')}`;

export const canDestroy = true;

export const canUpdate = true;

export const pageSize = 10;

export const schema = {
    email: {
        type: 'email',
        value: '',
        rules: yup.string()
            .email()
            .max(255),
        errors: [],
    },
    name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .max(255),
        errors: [],
    },
    password: {
        type: 'password',
        value: '',
        rules: yup.string()
            .max(255)
            .min(6),
        errors: [],
        dontGetResourceValue: true,
    },
    password_confirmation: {
        type: 'password',
        value: '',
        rules: yup.string()
            .max(255)
            .min(6),
        errors: [],
        dontGetResourceValue: true,
    },
    role_id: {
        type: 'select',
        value: '',
        rules: yup.number()
            .min(1),
        errors: [],
        label: 'Role',
        emptyOption: 'Please select a role...',
        values: [],
        selectOptionText: roleSelectOptionText,
        selectOptionValue: roleSelectOptionValue,
        valuesFetcher: {...roleValuesFetcher},
    },
};

export const attributesSequenceToShow = [
    'email',
    'name',
    'role_id',
];
