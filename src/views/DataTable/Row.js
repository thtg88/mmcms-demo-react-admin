import React from 'react';
import { Link } from 'react-router-dom';

const Row = ({ columns, entity, keyField, urlBuilder }) => (
    <tr>
        {columns.map((column, idx) => {
            const content = get(entity, column.dataField);

            if(column.dataField === keyField) {
                return (
                    <th key={'entity_'+entity[keyField]+'_'+column.dataField} scope="row"><Link to={urlBuilder(entity)}>{content}</Link></th>
                );
            }

            return (
                <td key={'entity_'+entity[keyField]+'_'+column.dataField}>{content}</td>
            );
        })}
    </tr>
);

export default Row;

const get = (target, field) => {
    var pathArray = splitNested(field);
    var result = void 0;

    try {
        result = pathArray.reduce(function (curr, path) {
            return curr[path];
        }, target);
    } catch (e) {}

    return result;
};

const splitNested = (str) => {
    return [str].join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
};
