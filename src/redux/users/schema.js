import * as yup from 'yup';

export const resourceDisplayName = 'User';

export const resourcesDisplayName = 'Users';

export const keyField = 'id';

export const nameField = 'name';

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-12 col-12',
    },
    {
        dataField: 'email',
        text: 'Email',
        className: 'col-md-6 col-12',
    },
    {
        dataField: 'role.display_name',
        text: 'Role',
        className: 'col-md-6 col-12',
    },
    {
        dataField: 'created_at',
        text: 'Registered',
        className: 'col-md-12',
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
    {
        display_name: 'ID',
        name: 'id',
        direction: 'asc',
    },
    {
        display_name: 'ID',
        name: 'id',
        direction: 'desc',
    },
];

export const defaultSortingOption = {...sortingOptions[0]};

export const searchColumns = [
    'ID',
    'Email',
    'Name',
];

export const pageSize = 10;

export const canDestroy = true;

export const schema = {
    name: {
        errors: [],
        rules: yup.string()
            .required()
            .max(255),
        type: 'text',
        value: '',
    },
    email: {
        errors: [],
        rules: yup.string()
            .required()
            .email()
            .max(255),
        type: 'email',
        value: '',
    },
    password: {
        errors: [],
        rules: yup.string()
            .required()
            .min(6)
            .max(255),
        type: 'password',
        value: '',
    },
    password_confirmation: {
        errors: [],
        label: 'Confirm Password',
        placeholder: 'Confirm your password',
        rules: yup.string()
            .required()
            .min(6)
            .max(255),
        type: 'password',
        value: '',
    },
    role_id: {
        empty_option: 'Please select a role for this user...',
        errors: [],
        rules: yup.number()
            .required(),
        type: 'select',
        value: '',
        values: [],
    },
};

export const attributesSequenceToShow = [
    'name',
    'email',
    // 'role_id',
];

export default schema;
