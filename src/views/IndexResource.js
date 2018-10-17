import React from 'react';
import {
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';
import ApiErrorCard from './Cards/ApiErrorCard';
import ResourceList from './ResourceList/ResourceList';
import PageTitle from './PageTitle';

const IndexResource = ({
    actions,
    columns,
    currentPage,
    errors,
    fetchingResources,
    handleSearchResources,
    history,
    listType,
    onSearchButtonClick,
    onSearchInputChange,
    pageSize,
    resources,
    resourcesName,
    searching,
    searchQuery,
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
        return (null);
    }

    let searchButtonIconClassName = "fa fa-search";
    if(searching === true && fetchingResources === true) {
        searchButtonIconClassName = "fa fa-spinner fa-spin";
    }

    return (
        <div className="animated fadeIn">
            <PageTitle text={resourcesName} actions={actions} />
            <Row>
                <Col xl={12}>
                    <ApiErrorCard errors={errors} />
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <Card className="card-accent-primary">
                        <CardBody>
                            <ResourceList
                                type={listType}
                                columns={columns}
                                data={resources[currentPage]}
                                history={history}
                                hover={!fetchingResources}
                                keyField="id"
                                loading={fetchingResources}
                                onSearchButtonClick={onSearchButtonClick}
                                onSearchInputChange={onSearchInputChange}
                                page={currentPage}
                                pageSize={pageSize}
                                query={searchQuery}
                                searchButtonDisabled={searching}
                                searchButtonIconClassName={searchButtonIconClassName}
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

export default IndexResource;
