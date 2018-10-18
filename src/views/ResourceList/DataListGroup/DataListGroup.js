import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import LoaderListGroupItem from './LoaderListGroupItem';
import EmptyListGroupItem from './EmptyListGroupItem';
import ResourceListGroupItem from './ResourceListGroupItem';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar';

const DataListGroup = ({
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
                onChange={onSearchInputChange}
                onSubmit={onSearchButtonClick}
                query={query}
            />
            <ListGroup flush className="mb-3">
                {loading
                    ? (
                        <LoaderListGroupItem
                            columns={columns}
                            type="placeholderShimmer"
                        />
                    )
                    : data.length > 0
                        ? data.map((entity, index) => (
                            <ResourceListGroupItem
                                key={entity[keyField]}
                                columns={columns}
                                history={history}
                                keyField={keyField}
                                entity={entity}
                                urlBuilder={urlBuilder}
                            />
                        ))
                        : (<EmptyListGroupItem />)
                }
            </ListGroup>
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

DataListGroup.propTypes = {
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

export default DataListGroup;
