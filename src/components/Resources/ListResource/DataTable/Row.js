import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from '../../../../helpers/formResources';

const Row = ({
    columns,
    entity,
    keyField,
    urlBuilder,
}) => (
    <tr>
        {
            columns.map((column, idx) => {
                const content = get(entity, column.dataField);

                if(column.dataField === keyField) {
                    return (
                        <th key={'entity_'+entity[keyField]+'_'+column.dataField} scope="row">
                            <Link to={urlBuilder(entity)}>{content}</Link>
                        </th>
                    );
                }

                return (
                    <td key={'entity_'+entity[keyField]+'_'+column.dataField}>
                        {content}
                    </td>
                );
            })
        }
    </tr>
);

Row.propTypes = {
    columns: PropTypes.array,
    entity: PropTypes.object,
    keyField: PropTypes.string,
    urlBuilder: PropTypes.func
};

export default Row;
