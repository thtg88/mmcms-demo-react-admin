import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import ApiErrorCard from './Cards/ApiErrorCard';
import CardHeaderActions from './CardHeaderActions';
import DataTable from './DataTable';

const IndexResource = ({
    actions,
    columns,
    currentPage,
    errors,
    fetchingResources,
    handleSearchResources,
    history,
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
            <Row>
                <Col xl={12}>
                    <ApiErrorCard errors={errors} />
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <Card className="card-accent-primary">
                        <CardHeader className="h1">
                            {resourcesName}
                            <CardHeaderActions actions={actions} />
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={resources[currentPage]}
                                history={history}
                                hover={!fetchingResources}
                                keyField="id"
                                loading={fetchingResources}
                                page={currentPage}
                                pageSize={pageSize}
                                total={total}
                                urlBuilder={urlBuilder}
                                onSearchButtonClick={onSearchButtonClick}
                                onSearchInputChange={onSearchInputChange}
                                query={searchQuery}
                                searchButtonDisabled={searching}
                                searchButtonIconClassName={searchButtonIconClassName}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default IndexResource;
