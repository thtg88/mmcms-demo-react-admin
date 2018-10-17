// import createdAtFormatter from './createdAtFormatter';

export const columns = [
    {
        dataField: 'id',
        text: 'ID',
        sort: true,
        className: 'col-sm-12',
    },
    {
        dataField: 'display_name',
        text: 'Display Name',
        sort: true,
        className: 'col-sm-4',
    },
    {
        dataField: 'priority',
        text: 'Priority',
        sort: true,
        className: 'col-sm-4',
    },
    {
        dataField: 'name',
        text: 'Name',
        sort: true,
        className: 'col-sm-4',
    },
    {
        dataField: 'created_at',
        text: 'Created',
        editable: false,
        className: 'col-sm-12',
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

export const cellEditProps = {
    mode: 'click'
};

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
