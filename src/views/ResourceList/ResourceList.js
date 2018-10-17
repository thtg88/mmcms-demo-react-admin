import React from 'react';
import DataListGroup from './DataListGroup';
import DataTable from './DataTable';

const ResourceList = ({
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

export default ResourceList;
