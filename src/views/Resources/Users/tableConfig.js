// import createdAtFormatter from './createdAtFormatter';

export const columns = [
    {
        dataField: 'id',
        text: 'ID',
        className: 'col-md-12',
        sort: true
    },
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-5 col-12',
        sort: true
    },
    {
        dataField: 'email',
        text: 'Email',
        className: 'col-md-5 col-12',
        sort: true
    },
    {
        dataField: 'role.display_name',
        text: 'Role',
        className: 'col-md-2 col-12',
        editable: false
    },
    {
        dataField: 'created_at',
        text: 'Registered',
        className: 'col-md-12',
        editable: false,
        // formatter: createdAtFormatter,
    },
];

const defaultSorted = [
    {
        dataField: 'id',
        order: 'desc'
    },
];

export const pageSize = 10;

const tableConfig = {
    columns,
    defaultSorted,
    keyField: 'id',
};

export default tableConfig;
