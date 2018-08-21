import React from 'react';
import { Table } from 'reactstrap';
import LoaderRow from './LoaderRow';
import EmptyRow from './EmptyRow';
import Row from './Row';

const DataTable = ({ columns, data, loading, keyField, urlBuilder, hover }) => (
    <Table responsive hover={hover}>
        <thead>
            <tr>
                {columns.map((column, index) => <th key={"header_"+index} scope="col">{column.text}</th>)}
            </tr>
        </thead>
        <tbody>
            {loading
                ? <LoaderRow colSpan={columns.length} />
                : data.length > 0
                    ? data.map((entity, index) => <Row key={entity[keyField]} columns={columns} keyField={keyField} entity={entity} urlBuilder={urlBuilder} />)
                    : <EmptyRow colSpan={columns.length} />
            }
        </tbody>
    </Table>
);

export default DataTable;
