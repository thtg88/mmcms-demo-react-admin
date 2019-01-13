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
        return null;
    }

    const searchButtonIconClassName = searching === true && fetchingResources === true
        ? 'fa fa-spinner fa-spin'
        : 'fa fa-search';

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
                            <ListResource
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

IndexResource.propTypes = {
    actions: PropTypes.array,
    columns: PropTypes.array,
    currentPage: PropTypes.number,
    errors: PropTypes.array,
    fetchingResources: PropTypes.bool,
    handleSearchResources: PropTypes.func,
    history: PropTypes.object,
    listType: PropTypes.string,
    onSearchButtonClick: PropTypes.func,
    onSearchInputChange: PropTypes.func,
    pageSize: PropTypes.number,
    resources: PropTypes.object,
    resourcesName: PropTypes.string,
    searching: PropTypes.bool,
    searchQuery: PropTypes.string,
    total: PropTypes.number,
    updateSearchInputValue: PropTypes.func,
    urlBuilder: PropTypes.func,
};

export default IndexResource;
