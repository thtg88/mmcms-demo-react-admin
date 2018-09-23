// import createdAtFormatter from './createdAtFormatter';

export const columns = [
    {
        dataField: 'id',
        text: 'ID',
        sort: true
    },
    {
        dataField: 'display_name',
        text: 'Display Name',
        sort: true
    },
    {
        dataField: 'priority',
        text: 'Priority',
        sort: true
    },
    {
        dataField: 'name',
        text: 'Name',
        sort: true
    },
    {
        dataField: 'created_at',
        text: 'Created',
        editable: false,
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
