import React from 'react';
import PropTypes from 'prop-types';
import { Table as BootstrapTable } from 'reactstrap';
import TableRow from './TableRow';

const Table = ({
    destinationBaseRoute,
    destinationRelationshipName,
    destroyResource,
    parentResource,
    reducerName,
    relationshipName,
    resourceDisplayName,
    setResource,
    unsetRelationshipItem,
}) => {
    if(
        ! parentResource
        || ! parentResource[relationshipName]
    ) {
        return null;
    }

    return (
        <BootstrapTable responsive hover>
            <thead>
                <tr>
                    <th className="w-75">Product</th>
                    <th className="w-25">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    parentResource[relationshipName].length
                        ? (
                            parentResource[relationshipName].map(
                                (childResource, idx) => (
                                    <TableRow
                                        key={`${childResource.id}`}
                                        childResource={childResource}
                                        destinationBaseRoute={destinationBaseRoute}
                                        destinationRelationshipName={destinationRelationshipName}
                                        destroyResource={destroyResource}
                                        reducerName={reducerName}
                                        relationshipName={relationshipName}
                                        setResource={setResource}
                                        unsetRelationshipItem={unsetRelationshipItem}
                                    />
                                )
                            )
                        )
                        : (
                            <tr>
                                <td colSpan={2}>No matching records found.</td>
                            </tr>
                        )
                }
            </tbody>
        </BootstrapTable>
    );
};

Table.propTypes = {
    parentResource: PropTypes.object,
    relationshipName: PropTypes.string.isRequired,
    reducerName: PropTypes.string.isRequired,
    resourceDisplayName: PropTypes.string.isRequired,
    setResource: PropTypes.func,
};

export default Table;
