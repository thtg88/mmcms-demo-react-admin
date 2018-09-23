import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import LoaderRow from './LoaderRow';
import EmptyRow from './EmptyRow';
import Row from './Row';
import Pagination from './Pagination';

const propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    history: PropTypes.object,
    hover: PropTypes.bool,
    keyField: PropTypes.string,
    loading: PropTypes.bool,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    urlBuilder: PropTypes.func
};

const DataTable = ({
    columns,
    data,
    history,
    hover,
    keyField,
    loading,
    page,
    pageSize,
    total,
    urlBuilder,
}) => {
    // console.log(loading);
    // console.log(data);

    return (
        <Fragment>
            <Table responsive hover={hover}>
                <thead>
                    <tr>
                        {columns.map((column, index) => <th key={"header_"+index} scope="col">{column.text}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {loading
                        ? (<LoaderRow colSpan={columns.length} />)
                        : data.length > 0
                            ? data.map((entity, index) => (<Row key={entity[keyField]} columns={columns} keyField={keyField} entity={entity} urlBuilder={urlBuilder} />))
                            : (<EmptyRow colSpan={columns.length} />)
                    }
                </tbody>
            </Table>
            {loading
                ? null
                : <Pagination
                    page={page}
                    total={total}
                    pageSize={pageSize}
                    history={history}
                />
            }
        </Fragment>
    )
};

DataTable.propTypes = propTypes;

export default DataTable;
