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

export const keyField = 'id';

export const nameField = 'name';

const tableConfig = {
    columns,
    defaultSortingOption,
    keyField,
    nameField,
    sortingOptions,
};

export default tableConfig;
