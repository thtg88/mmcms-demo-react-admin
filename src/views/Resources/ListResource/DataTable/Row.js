import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from '../../../../helpers/formResources';

const Row = ({ columns, entity, keyField, urlBuilder }) => (
    <tr>
        {
            columns.map((column, idx) => {
                const { dataField } = column;
                const content = get(entity, dataField);
                const key = `entity_${entity[keyField]}_${dataField}`;

                if(dataField === keyField) {
                    return (
                        <th key={key} scope="row">
                            <Link to={urlBuilder(entity)}>{content}</Link>
                        </th>
                    );
                }

                return (
                    <td key={key}>{content}</td>
                );
            })
        }
    </tr>
);

Row.propTypes = {
    columns: PropTypes.array,
    entity: PropTypes.object,
    keyField: PropTypes.string,
    urlBuilder: PropTypes.func,
};

export default Row;
