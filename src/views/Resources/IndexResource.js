import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';
import ApiErrorCard from '../Cards/ApiErrorCard';
import ListResource from './ListResource/ListResource';
import PageTitle from '../PageTitle';

const IndexResource = ({
    actions,
    columns,
    currentPage,
    errors,
    fetchingResources,
    handleSearchResources,
    history,
    keyField,
    isSortDropdownOpen,
    listgroupItemTag,
    listType,
    nameField,
    onPageClick,
    onSearchButtonClick,
    onSearchInputChange,
    onSearchInputClear,
    onSortDropdownItemClick,
    pageSize,
    resourceBaseRoute,
    resourceListGroupItemClassName,
    resources,
    resourcesName,
    searchEnabled,
    searching,
    searchQuery,
    searchTextInputPlaceholder,
    selectedSortingOption,
    sortingEnabled,
    sortingOptions,
    toggleSortDropdown,
    total,
    updateSearchInputValue,
    urlBuilder,
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

    const searchButtonIconClassName = searching === true && fetchingResources === true
        ? 'fa fa-spinner fa-spin'
        : 'fa fa-search';

    return (
        <div className="animated fadeIn">
            <PageTitle text={resourcesName} actions={actions} />
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
                                columns={columns}
                                data={resources[currentPage]}
                                history={history}
                                hover={!fetchingResources}
                                isSortDropdownOpen={isSortDropdownOpen}
                                keyField={keyField}
                                listgroupItemTag={listgroupItemTag}
                                loading={fetchingResources}
                                nameField={nameField}
                                onPageClick={onPageClick}
                                onSearchButtonClick={onSearchButtonClick}
                                onSearchInputChange={onSearchInputChange}
                                onSearchInputClear={onSearchInputClear}
                                onSortDropdownItemClick={onSortDropdownItemClick}
                                page={currentPage}
                                pageSize={pageSize}
                                query={searchQuery}
                                resourceBaseRoute={resourceBaseRoute}
                                resourceListGroupItemClassName={resourceListGroupItemClassName}
                                searchButtonDisabled={searching || fetchingResources}
                                searchButtonIconClassName={searchButtonIconClassName}
                                searchEnabled={searchEnabled}
                                searchTextInputPlaceholder={searchTextInputPlaceholder}
                                selectedSortingOption={selectedSortingOption}
                                sortingEnabled={sortingEnabled}
                                sortingOptions={sortingOptions}
                                sortButtonDisabled={fetchingResources}
                                toggleSortDropdown={toggleSortDropdown}
                                total={total}
                                type={listType}
                                urlBuilder={urlBuilder}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

IndexResource.propTypes = {
    actions: PropTypes.array,
    columns: PropTypes.array,
    currentPage: PropTypes.number,
    errors: PropTypes.array,
    fetchingResources: PropTypes.bool,
    handleSearchResources: PropTypes.func,
    history: PropTypes.object,
    isSortDropdownOpen: PropTypes.bool,
    keyField: PropTypes.string,
    listType: PropTypes.string,
    nameField: PropTypes.string,
    onPageClick: PropTypes.func,
    onSearchButtonClick: PropTypes.func,
    onSearchInputChange: PropTypes.func,
    onSearchInputClear: PropTypes.func,
    onSortDropdownItemClick: PropTypes.func,
    pageSize: PropTypes.number,
    resources: PropTypes.object,
    resourceBaseRoute: PropTypes.string,
    resourceListGroupItemClassName: PropTypes.string,
    resourcesName: PropTypes.string,
    searchEnabled: PropTypes.bool,
    searching: PropTypes.bool,
    searchQuery: PropTypes.string,
    searchTextInputPlaceholder: PropTypes.string,
    selectedSortingOption: PropTypes.object,
    sortButtonDisabled: PropTypes.bool,
    sortingEnabled: PropTypes.bool,
    sortingOptions: PropTypes.array,
    toggleSortDropdown: PropTypes.func,
    total: PropTypes.number,
    updateSearchInputValue: PropTypes.func,
    urlBuilder: PropTypes.func,
};

export default IndexResource;
