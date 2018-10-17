import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import LoaderRow from './LoaderRow';
import EmptyRow from './EmptyRow';
import Row from './Row';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar';

const DataTable = ({
    columns,
    data,
    history,
    hover,
    keyField,
    loading,
    onSearchButtonClick,
    onSearchInputChange,
    page,
    pageSize,
    query,
    searchButtonDisabled,
    searchButtonIconClassName,
    total,
    urlBuilder
}) => {
    // console.log(query);

    return (
        <Fragment>
            <SearchBar
                buttonDisabled={searchButtonDisabled}
                iconClassName={searchButtonIconClassName}
                onSubmit={onSearchButtonClick}
                onChange={onSearchInputChange}
                query={query}
            />
            <Table responsive hover={hover}>
                <thead>
                    <tr className="table-secondary">
                        {columns.map((column, index) => <th key={"header_"+index} scope="col">{column.text}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {loading
                        ? (<LoaderRow colSpan={columns.length} />)
                        : data.length > 0
                            ? data.map((entity, index) => (
                                <Row
                                    key={entity[keyField]}
                                    columns={columns}
                                    keyField={keyField}
                                    entity={entity}
                                    urlBuilder={urlBuilder}
                                />
                            ))
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

DataTable.propTypes = {
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

export default DataTable;
