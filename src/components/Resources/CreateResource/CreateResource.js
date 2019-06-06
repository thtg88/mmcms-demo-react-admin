import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';
import ApiErrorCard from '../../Cards/ApiErrorCard';
import PageTitle from '../../PageTitle';
import ResourceForm from '../ResourceForm';

const CreateResource = ({
    creatingResource,
    dispatchedValuesSearchers,
    formSchema,
    handleCKEditorImageFileUpload,
    handleCreateResource,
    errors,
    resourceDisplayName,
    resourceUnchanged,
    updateInputValue,
}) => {
    const createButtonIconClassName = creatingResource === true
        ? 'fa fa-spinner fa-spin'
        : 'fa fa-plus';

    return (
        <div className="animated fadeIn">
            <Row>
                <Col className="col-md-12">
                    <ApiErrorCard errors={errors} />
                </Col>
            </Row>
            <PageTitle text={`Create ${resourceDisplayName}`} />
            <Row>
                <Col className="col-md-12">
                    <Card className="card-accent-success">
                        <CardBody>
                            <ResourceForm
                                dispatchedValuesSearchers={dispatchedValuesSearchers}
                                formSchema={formSchema}
                                onCKEditorImageUpload={handleCKEditorImageFileUpload}
                                onInputChange={updateInputValue}
                                onSubmit={handleCreateResource}
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
    formSchema: PropTypes.object,
    handleCKEditorImageFileUpload: PropTypes.func,
    handleCreateResource: PropTypes.func,
    errors: PropTypes.array,
    resourceDisplayName: PropTypes.string,
    resourceUnchanged: PropTypes.bool,
    updateInputValue: PropTypes.func,
};

CreateResource.defaultProps = {
    resourceDisplayName: 'Resource',
};

export default CreateResource;
