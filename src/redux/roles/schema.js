import * as yup from 'yup';

export const resourcesName = 'Roles';

export const keyField = 'id';

export const nameField = 'name';

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-12 col-12',
    },
    {
        dataField: 'display_name',
        text: 'Display Name',
        className: 'col-md-6 col-12',
    },
    {
        dataField: 'priority',
        text: 'Priority',
        className: 'col-md-6 col-12',
    },
    {
        dataField: 'created_at',
        text: 'Created',
        className: 'col-md-12 col-12',
    }
];

export const sortingOptions = [
    {
        display_name: 'Display Name',
        name: 'display_name',
        direction: 'asc',
    },
    {
        display_name: 'Display Name',
        name: 'display_name',
        direction: 'desc',
    },
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
    'Display Name',
    'ID',
    'Name',
];

export const pageSize = 10;

export const canDestroy = true;

export const schema = {
    display_name: {
        errors: [],
        rules: yup.string()
            .required()
            .max(255),
        type: 'text',
        value: '',
    },
    name: {
        errors: [],
        rules: yup.string()
            .required()
            .max(255),
        type: 'text',
        value: '',
    },
    priority: {
        errors: [],
        rules: yup.number()
            .required()
            .integer()
            .min(0),
        type: 'number',
        value: '',
    },
};

export const attributesSequenceToShow = [
    'display_name',
    'name',
    'priority',
];

export default schema;
