import React from 'react';
import {
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';
import ApiErrorCard from './Cards/ApiErrorCard';
import PageTitle from './PageTitle';
import ResourceForm from './ResourceForm';

const CreateResource = ({
    creatingResource,
    handleCreateResource,
    errors,
    resource,
    resourceUnchanged,
    updateInputValue,
}) => {
    // console.log('resourceUnchanged', resourceUnchanged);

    let createButtonIconClassName = "fa fa-plus";
    if(creatingResource === true) {
        createButtonIconClassName = "fa fa-spinner fa-spin";
    }

    return (
        <div className="animated fadeIn">
            <Row>
                <Col md="12">
                    <ApiErrorCard errors={errors} />
                </Col>
            </Row>
            <PageTitle text="Create Resource" />
            <Row>
                <Col lg={12}>
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

export default CreateResource;
