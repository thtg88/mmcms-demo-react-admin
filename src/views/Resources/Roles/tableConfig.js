// import createdAtFormatter from './createdAtFormatter';

export const columns = [
    {
        dataField: 'id',
        text: 'ID',
        sort: true,
        className: 'col-md-12',
    },
    {
        dataField: 'display_name',
        text: 'Display Name',
        sort: true,
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'name',
        text: 'Name',
        sort: true,
        className: 'col-md-2 col-12',
    },
    {
        dataField: 'priority',
        text: 'Priority',
        sort: true,
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'created_at',
        text: 'Created',
        editable: false,
        className: 'col-md-12 col-12',
        // formatter: createdAtFormatter,
    }
];

// const selectRow = {
//     mode: 'checkbox',
//     clickToSelect: false
// };

const defaultSorted = [
    {
        dataField: 'id',
        order: 'desc'
    }
];

export const pageSize = 10;

const tableConfig = {
    striped: true,
    hover: true,
    bordered: false,
    bootstrap4: true,
    remote: {
        filter: false,
        pagination: true,
        sort: false,
        // cellEdit: true
    },
    keyField: "id",
    columns,
    defaultSorted
    // ,
    // selectRow
};

export default tableConfig;
