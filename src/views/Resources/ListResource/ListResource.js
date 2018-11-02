import React from 'react';
import PropTypes from 'prop-types';
import DataListGroup from './DataListGroup';
import DataTable from './DataTable';

const ListResource = ({
    type,
    ...props
}) => {
    if(type === "list") {
        return (<DataListGroup {...props } />);
    }

    if(type === "table") {
        return (<DataTable {...props} />);
    }

    return (null);
};

ListResource.propTypes = {
    type: PropTypes.string
};

export default ListResource;
