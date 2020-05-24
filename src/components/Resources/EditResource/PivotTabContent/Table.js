import React from 'react';
import PropTypes from 'prop-types';
import { Table as BootstrapTable } from 'reactstrap';
import TableRow from './TableRow';

const Table = ({
    destinationBaseRoute,
    destinationRelationshipName,
    parentResource,
    reducerName,
    relationshipName,
    resourceDisplayName,
    setResource,
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
                                        reducerName={reducerName}
                                        setResource={setResource}
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
