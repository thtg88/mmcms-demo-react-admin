// import createdAtFormatter from './createdAtFormatter';

export const columns = [
    {
        dataField: 'id',
        text: 'ID',
        sort: true
    },
    {
        dataField: 'name',
        text: 'Name',
        sort: true
    },
    {
        dataField: 'email',
        text: 'Email',
        sort: true
    },
    {
        dataField: 'role.display_name',
        text: 'Role',
        editable: false
    },
    {
        dataField: 'created_at',
        text: 'Registered',
        editable: false,
        // formatter: createdAtFormatter,
    }
];

const selectRow = {
    mode: 'checkbox',
    clickToSelect: false
};

const defaultSorted = [
    {
        dataField: 'id',
        order: 'desc'
    }
];

export const cellEditProps = {
    mode: 'click'
};

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
