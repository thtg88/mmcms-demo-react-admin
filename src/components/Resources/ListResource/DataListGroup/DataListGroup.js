import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    ListGroup,
    Row
} from 'reactstrap';
import SimpleFilterDropdown from '../SimpleFilterDropdown';
import LoaderListGroupItem from '../LoaderListGroupItem';
import EmptyListGroupItem from '../EmptyListGroupItem';
import ResourceListGroupItem from './ResourceListGroupItem';
import Pagination from '../Pagination';
import SortDropdown from '../SortDropdown';
import SearchBar from '../SearchBar';

const DataListGroup = ({
    columns,
    data,
    filters,
    history,
    hover,
    keyField,
    listgroupItemTag,
    loading,
    nameField,
    onPageClick,
    onSearchButtonClick,
    onSearchInputChange,
    onSearchInputClear,
    onSimpleFilterDropdownItemClick,
    onSortDropdownItemClick,
    page,
    pageSize,
    preItem,
    query,
    resourceBaseRoute,
    resourceItemClassName,
    searchButtonDisabled,
    searchButtonIconClassName,
    searchEnabled,
    searchTextInputPlaceholder,
    selectedSortingOption,
    sortButtonDisabled,
    sortingOptions,
    total,
    urlBuilder,
    urlParams,
}) => {
    let searchClassName;
    let sortingClassName;
    if(
        (
            sortingOptions
            && sortingOptions.length > 0
        )
        && searchEnabled === true
    ) {
        sortingClassName = 'col-md-4 col-12 mb-3';
        searchClassName = 'col-md-8 col-12';

    } else if(
        (
            sortingOptions
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
                    sortingOptions && sortingOptions.length > 0
                        ? (
                            <Col className={sortingClassName}>
                                <SortDropdown
                                    onDropdownItemClick={onSortDropdownItemClick}
                                    selectedSortingOption={selectedSortingOption}
                                    sortButtonDisabled={sortButtonDisabled}
                                    sortingOptions={sortingOptions}
                                />
                            </Col>
                        )
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
            {
                filters && filters.length
                    ? (
                        <Row>
                            {
                                filters.map((filter, idx) => (
                                    <Col key={idx} className={`mb-3 col-12 col-md-4`}>
                                        <SimpleFilterDropdown
                                            disabled={filter.disabled}
                                            itemStyle={filter.itemStyle}
                                            label={filter.label}
                                            name={filter.name}
                                            onDropdownItemClick={onSimpleFilterDropdownItemClick}
                                            operator={filter.operator}
                                            value={filter.value}
                                            values={filter.values}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    )
                    : null
            }
            <ListGroup flush className="mb-3">
                {
                    loading
                        ? (
                            <LoaderListGroupItem
                                columns={columns}
                                pageSize={pageSize}
                                type="placeholderShimmer"
                            />
                        )
                        : (
                            data.length > 0
                                ? (
                                    data.map((entity, index) => {
                                        const listGroupItemClassName = typeof resourceItemClassName === 'function'
                                            ? resourceItemClassName(entity)
                                            : resourceItemClassName;

                                        return (
                                            <ResourceListGroupItem
                                                key={entity[keyField]+'_'+index}
                                                columns={columns}
                                                history={history}
                                                keyField={keyField}
                                                listGroupItemClassName={listGroupItemClassName}
                                                nameField={nameField}
                                                entity={entity}
                                                tag={listgroupItemTag}
                                                urlBuilder={urlBuilder}
                                                preItem={preItem}
                                            />
                                        );
                                    })
                                )
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
                            urlParams={urlParams}
                        />
                    )
            }
        </>
    );
};

DataListGroup.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array.isRequired,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            disabled: PropTypes.bool,
            label: PropTypes.string,
            name: PropTypes.string,
            operator: PropTypes.string,
            selectOptionText: PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.string,
            ]),
            selectOptionValue: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            values: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    value: PropTypes.oneOfType([
                        PropTypes.number,
                        PropTypes.string,
                    ]),
                }),
            ),
            valuesFetcher: PropTypes.shape({
                reducerName: PropTypes.string,
                fetcher: PropTypes.func,
                fetcherName: PropTypes.string,
            }),
        }),
    ),
    history: PropTypes.object,
    hover: PropTypes.bool,
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
    resourceItemClassName: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    searchButtonDisabled: PropTypes.bool,
    searchButtonIconClassName: PropTypes.string,
    searchEnabled: PropTypes.bool,
    searchTextInputPlaceholder: PropTypes.string,
    selectedSortingOption: PropTypes.object,
    sortButtonDisabled: PropTypes.bool,
    sortingOptions: PropTypes.array,
    total: PropTypes.number,
    urlBuilder: PropTypes.func,
    urlParams: PropTypes.object,
};

export default DataListGroup;
