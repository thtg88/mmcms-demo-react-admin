import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';
import ApiErrorCard from '../../Cards/ApiErrorCard';
import ListResource from './ListResource';
import PageTitle from '../../PageTitle';

const ListResourceContainer = ({
    actions,
    columns,
    currentPage,
    errors,
    fetchingResources,
    filters,
    history,
    keyField,
    listgroupItemTag,
    listType,
    nameField,
    onDragEnd,
    onPageClick,
    onSearchButtonClick,
    onSearchInputChange,
    onSearchInputClear,
    onSimpleFilterDropdownItemClick,
    onSortDropdownItemClick,
    pageSize,
    resourceBaseRoute,
    resourceItemClassName,
    resources,
    resourcesDisplayName,
    searchEnabled,
    searching,
    searchQuery,
    searchTextInputPlaceholder,
    selectedSortingOption,
    sortingOptions,
    total,
    urlBuilder,
    urlParams,
}) => {
    if(
        (
            (
                typeof resources === 'undefined'
                || typeof currentPage === 'undefined'
                || typeof resources[currentPage] === 'undefined'
            )
            && !fetchingResources
        )
        || typeof total === 'undefined'
    ) {
        return null;
    }

    const searchButtonIconClassName = (searching === true && fetchingResources === true)
        ? 'fa fa-spinner fa-spin'
        : 'fa fa-search';

    return (
        <div className="animated fadeIn">
            <PageTitle text={resourcesDisplayName} actions={actions} />
            <Row>
                <Col className="col-md-12">
                    <ApiErrorCard errors={errors} />
                </Col>
            </Row>
            <Row>
                <Col className="col-md-12">
                    <Card className="card-accent-primary">
                        <CardBody>
                            <ListResource
                                type={listType}
                                columns={columns}
                                data={resources.constructor === Array ? resources : resources[currentPage]}
                                filters={filters}
                                history={history}
                                hover={!fetchingResources}
                                keyField={keyField}
                                listgroupItemTag={listgroupItemTag}
                                loading={fetchingResources}
                                nameField={nameField}
                                onDragEnd={onDragEnd}
                                onPageClick={onPageClick}
                                onSearchButtonClick={onSearchButtonClick}
                                onSearchInputChange={onSearchInputChange}
                                onSearchInputClear={onSearchInputClear}
                                onSimpleFilterDropdownItemClick={onSimpleFilterDropdownItemClick}
                                onSortDropdownItemClick={onSortDropdownItemClick}
                                page={currentPage}
                                pageSize={pageSize}
                                query={searchQuery}
                                resourceBaseRoute={resourceBaseRoute}
                                resourceItemClassName={resourceItemClassName}
                                searchButtonDisabled={searching || fetchingResources}
                                searchButtonIconClassName={searchButtonIconClassName}
                                searchEnabled={searchEnabled}
                                searchTextInputPlaceholder={searchTextInputPlaceholder}
                                selectedSortingOption={selectedSortingOption}
                                sortingOptions={sortingOptions}
                                sortButtonDisabled={fetchingResources}
                                total={total}
                                urlBuilder={urlBuilder}
                                urlParams={urlParams}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

ListResourceContainer.propTypes = {
    actions: PropTypes.array,
    columns: PropTypes.array,
    currentPage: PropTypes.number,
    errors: PropTypes.array,
    fetchingResources: PropTypes.bool,
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
    keyField: PropTypes.string,
    listType: PropTypes.string,
    nameField: PropTypes.string,
    onPageClick: PropTypes.func,
    onSearchButtonClick: PropTypes.func,
    onSearchInputChange: PropTypes.func,
    onSearchInputClear: PropTypes.func,
    onSimpleFilterDropdownItemClick: PropTypes.func,
    onSortDropdownItemClick: PropTypes.func,
    pageSize: PropTypes.number,
    resources: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    resourceBaseRoute: PropTypes.string,
    resourceItemClassName: PropTypes.string,
    resourcesDisplayName: PropTypes.string,
    searchEnabled: PropTypes.bool,
    searching: PropTypes.bool,
    searchQuery: PropTypes.string,
    searchTextInputPlaceholder: PropTypes.string,
    selectedSortingOption: PropTypes.object,
    sortButtonDisabled: PropTypes.bool,
    sortingOptions: PropTypes.array,
    total: PropTypes.number,
    urlBuilder: PropTypes.func,
    urlParams: PropTypes.object,
};

export default ListResourceContainer;
