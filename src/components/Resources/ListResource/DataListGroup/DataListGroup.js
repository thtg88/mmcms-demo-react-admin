import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    ListGroup,
    Row,
} from 'reactstrap';
import LoaderListGroupItem from './LoaderListGroupItem';
import EmptyListGroupItem from './EmptyListGroupItem';
import ResourceListGroupItem from './ResourceListGroupItem';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar';
import SortDropdown from '../SortDropdown';

const DataListGroup = ({
    columns,
    data,
    history,
    hover,
    keyField,
    isSortDropdownOpen,
    listgroupItemTag,
    loading,
    nameField,
    onSearchButtonClick,
    onSearchInputChange,
    onSearchInputClear,
    onPageClick,
    onSortDropdownItemClick,
    page,
    pageSize,
    preItem,
    query,
    resourceBaseRoute,
    resourceListGroupItemClassName,
    searchButtonDisabled,
    searchButtonIconClassName,
    searchEnabled,
    searchTextInputPlaceholder,
    selectedSortingOption,
    sortButtonDisabled,
    sortingEnabled,
    sortingOptions,
    toggleSortDropdown,
    total,
    urlBuilder,
}) => {
    let searchClassName;
    let sortingClassName;
    if(
        (
            sortingEnabled === true
            && sortingOptions.length > 0
        )
        && searchEnabled === true
    ) {
        sortingClassName = 'col-md-4 col-12 mb-3';
        searchClassName = 'col-md-8 col-12';

    } else if(
        (
            sortingEnabled === true
            && sortingOptions.length > 0
        )
        || searchEnabled === true
    ) {
        sortingClassName = 'col-12';
        searchClassName = 'col-12';
    }

    return (
        <>
            <Row>
                {
                    sortingEnabled === true && sortingOptions.length > 0
                        ? <Col className={sortingClassName}>
                            <SortDropdown
                                isDropdownOpen={isSortDropdownOpen}
                                onDropdownItemClick={onSortDropdownItemClick}
                                selectedSortingOption={selectedSortingOption}
                                sortButtonDisabled={sortButtonDisabled}
                                sortingOptions={sortingOptions}
                                toggleDropdown={toggleSortDropdown}
                            />
                        </Col>
                        : null
                }
                {
                    searchEnabled === true
                        ? (
                            <Col className={searchClassName}>
                                <SearchBar
                                    buttonDisabled={searchButtonDisabled}
                                    iconClassName={searchButtonIconClassName}
                                    onChange={onSearchInputChange}
                                    onClear={onSearchInputClear}
                                    onSubmit={onSearchButtonClick}
                                    query={query}
                                    textInputPlaceholder={searchTextInputPlaceholder}
                                />
                            </Col>
                        )
                        : null
                }
            </Row>
            <ListGroup flush className="mb-3">
                {
                    loading
                        ? (
                            <LoaderListGroupItem
                                columns={columns}
                                type="placeholderShimmer"
                            />
                        )
                        : (
                            data.length > 0
                                ? data.map((entity, index) => {
                                    let listGroupItemClassName;
                                    if(typeof resourceListGroupItemClassName === 'function') {
                                        listGroupItemClassName = resourceListGroupItemClassName(entity);
                                    } else {
                                        listGroupItemClassName = resourceListGroupItemClassName;
                                    }

                                    return (
                                        <ResourceListGroupItem
                                            columns={columns}
                                            entity={entity}
                                            history={history}
                                            key={entity[keyField]+'_'+index}
                                            keyField={keyField}
                                            listGroupItemClassName={listGroupItemClassName}
                                            nameField={nameField}
                                            preItem={preItem}
                                            tag={listgroupItemTag}
                                            urlBuilder={urlBuilder}
                                        />
                                    );
                                })
                                : <EmptyListGroupItem />
                        )
                }
            </ListGroup>
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
    )
};

DataListGroup.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    history: PropTypes.object,
    hover: PropTypes.bool,
    isSortDropdownOpen: PropTypes.bool,
    keyField: PropTypes.string,
    listgroupItemTag: PropTypes.string,
    loading: PropTypes.bool,
    nameField: PropTypes.string,
    onPageClick: PropTypes.func,
    onSearchButtonClick: PropTypes.func,
    onSearchInputChange: PropTypes.func,
    onSearchInputClear: PropTypes.func,
    onSortDropdownItemClick: PropTypes.func,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    preItem: PropTypes.func,
    query: PropTypes.string,
    resourceBaseRoute: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    resourceListGroupItemClassName: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    searchButtonDisabled: PropTypes.bool,
    searchButtonIconClassName: PropTypes.string,
    searchEnabled: PropTypes.bool,
    searchTextInputPlaceholder: PropTypes.string,
    selectedSortingOption: PropTypes.object,
    sortButtonDisabled: PropTypes.bool,
    sortingEnabled: PropTypes.bool,
    sortingOptions: PropTypes.array,
    toggleSortDropdown: PropTypes.func,
    total: PropTypes.number,
    urlBuilder: PropTypes.func,
};

export default DataListGroup;
