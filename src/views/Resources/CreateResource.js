import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';
import ApiErrorCard from '../Cards/ApiErrorCard';
import PageTitle from '../PageTitle';
import ResourceForm from './ResourceForm';

const CreateResource = ({
    creatingResource,
    handleCreateResource,
    errors,
    resource,
    resourceName,
    resourceUnchanged,
    updateInputValue,
}) => {
    const createButtonIconClassName = creatingResource === true
        ? 'fa fa-spinner fa-spin'
        : 'fa fa-plus';
    const pageTitleText = resourceName
        ? resourceName
        : 'Resource';

    return (
        <div className="animated fadeIn">
            <Row>
                <Col className="col-md-12">
                    <ApiErrorCard errors={errors} />
                </Col>
            </Row>
            <PageTitle text={`Create ${pageTitleText}`} />
            <Row>
                <Col className="col-md-12">
                    <Card className="card-accent-success">
                        <CardBody>
                            <ResourceForm
                                onInputChange={updateInputValue}
                                onSubmit={handleCreateResource}
                                resource={resource}
                                submitButtonClassName="success"
                                submitButtonDisabled={resourceUnchanged || creatingResource}
                                submitButtonIconClassName={createButtonIconClassName}
                                submitButtonText="Create"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

CreateResource.proptTypes = {
    creatingResource: PropTypes.bool,
    handleCreateResource: PropTypes.func,
    errors: PropTypes.array,
    resource: PropTypes.object,
    resourceName: PropTypes.string,
    resourceUnchanged: PropTypes.bool,
    updateInputValue: PropTypes.func,
};

export default CreateResource;
