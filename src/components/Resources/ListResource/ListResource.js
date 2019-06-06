import React from 'react';
import PropTypes from 'prop-types';
import DataListGroup from './DataListGroup';
import DataListGroupDraggable from './DataListGroupDraggable';
import DataTable from './DataTable';
import DataGrid from './DataGrid';

const ListResource = ({
    type,
    ...props
}) => {
    if(type === 'grid') {
        return <DataGrid {...props } />;
    }

    if(type === 'list-draggable') {
        return <DataListGroupDraggable {...props } />;
    }

    if(type === 'list') {
        return <DataListGroup {...props } />;
    }

    if(type === 'table') {
        return <DataTable {...props} />;
    }

    return null;
};

ListResource.propTypes = {
    type: PropTypes.string
};

export default ListResource;
