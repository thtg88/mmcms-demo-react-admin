import React from 'react';
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
    nameField,
    onPageClick,
    onSearchButtonClick,
    onSearchInputChange,
    onSearchInputClear,
    page,
    pageSize,
    query,
    resourceBaseRoute,
    searchButtonDisabled,
    searchButtonIconClassName,
    searchEnabled,
    searchTextInputPlaceholder,
    total,
    urlBuilder,
}) => (
    <>
        {
            searchEnabled === true
                ? (
                    <SearchBar
                        buttonDisabled={searchButtonDisabled}
                        columnClassName="col-md-12"
                        iconClassName={searchButtonIconClassName}
                        onChange={onSearchInputChange}
                        onClear={onSearchInputClear}
                        onSubmit={onSearchButtonClick}
                        query={query}
                        textInputPlaceholder={searchTextInputPlaceholder}
                    />
                )
                : null
        }
        <Table responsive hover={hover}>
            <thead>
                <tr className="table-secondary">
                    {columns.map((column, index) => <th key={"header_"+index} scope="col">{column.text}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    loading
                        ? (
                            <LoaderRow
                                colSpan={columns.length}
                                type="spinner"
                            />
                        )
                        : (
                            data.length > 0
                                ? (
                                    data.map((entity, index) => (
                                        <Row
                                            key={entity[keyField]}
                                            columns={columns}
                                            keyField={keyField}
                                            nameField={nameField}
                                            entity={entity}
                                            urlBuilder={urlBuilder}
                                        />
                                    ))
                                )
                                : <EmptyRow colSpan={columns.length} />
                        )
                }
            </tbody>
        </Table>
        {
            loading
                ? null
                : (
                    <Pagination
                        history={history}
                        onPageClick={onPageClick}
                        page={page}
                        pageSize={pageSize}
                        resourceBaseRoute={resourceBaseRoute}
                        total={total}
                    />
                )
        }
    </>
);

DataTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    history: PropTypes.object,
    hover: PropTypes.bool,
    keyField: PropTypes.string,
    loading: PropTypes.bool,
    nameField: PropTypes.string,
    onPageClick: PropTypes.func,
    onSearchButtonClick: PropTypes.func,
    onSearchInputChange: PropTypes.func,
    onSearchInputClear: PropTypes.func,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    query: PropTypes.string,
    resourceBaseRoute: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    searchButtonDisabled: PropTypes.bool,
    searchButtonIconClassName: PropTypes.string,
    searchEnabled: PropTypes.bool,
    searchTextInputPlaceholder: PropTypes.string,
    total: PropTypes.number,
    urlBuilder: PropTypes.func,
};

export default DataTable;
