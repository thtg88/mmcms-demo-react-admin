export const columns = [
    {
        dataField: 'id',
        text: 'ID',
        className: 'col-md-12',
    },
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-5 col-12',
    },
    {
        dataField: 'email',
        text: 'Email',
        className: 'col-md-5 col-12',
    },
    {
        dataField: 'role.display_name',
        text: 'Role',
        className: 'col-md-2 col-12',
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
