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
    history,
    keyField,
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
    resourcesDisplayName,
    searchEnabled,
    searching,
    searchQuery,
    searchTextInputPlaceholder,
    selectedSortingOption,
    sortingEnabled,
    sortingOptions,
    total,
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
                                data={resources[currentPage]}
                                history={history}
                                hover={!fetchingResources}
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
                                total={total}
                                urlBuilder={urlBuilder}
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
    history: PropTypes.object,
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
    resourcesDisplayName: PropTypes.string,
    searchEnabled: PropTypes.bool,
    searching: PropTypes.bool,
    searchQuery: PropTypes.string,
    searchTextInputPlaceholder: PropTypes.string,
    selectedSortingOption: PropTypes.object,
    sortButtonDisabled: PropTypes.bool,
    sortingEnabled: PropTypes.bool,
    sortingOptions: PropTypes.array,
    total: PropTypes.number,
    urlBuilder: PropTypes.func,
};

export default ListResourceContainer;
