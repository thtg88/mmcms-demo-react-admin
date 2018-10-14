import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap';
import ApiErrorCard from './Cards/ApiErrorCard';
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
            <Row>
                <Col lg={12}>
                    <Card className="card-accent-success">
                        <CardHeader className="h1">Create Resource</CardHeader>
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
