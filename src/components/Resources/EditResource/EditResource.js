import React from 'react';
import {
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import ApiErrorCard from '../../Cards/ApiErrorCard';
import DestroyResourceModal from '../DestroyResourceModal';
import PageTitle from '../../PageTitle';
import ResourceForm from '../ResourceForm';
import SpinnerLoader from '../../SpinnerLoader';

const EditResource = ({
    actions,
    canDestroy,
    destroyingResource,
    errors,
    gettingResource,
    handleDestroyResource,
    handleUpdateResource,
    isDestroyResourceModalOpen,
    resource,
    resourceUnchanged,
    toggleDestroyResourceModal,
    updateInputValue,
    updatingResource,
}) => {
    const destroyButtonIconClassName = destroyingResource === true
        ? 'fa fa-spinner fa-spin'
        : 'fa fa-trash';
    const updateButtonIconClassName = updatingResource === true
        ? 'fa fa-spinner fa-spin'
        : 'fa fa-save';
    const resourceName = (
        typeof resource === 'undefined'
        || resource === null
        || typeof resource.name === 'undefined'
        || typeof resource.name.value === 'undefined'
    )
        ? 'Loading...'
        : resource.name.value;

    return (
        <div className="animated fadeIn">
            <Row>
                <Col className="col-md-12">
                    <ApiErrorCard errors={errors} />
                </Col>
            </Row>
            {
                (
                    (
                        typeof resource === 'undefined'
                        || resource === null
                        || (
                            Object.keys(resource).length === 0
                            && resource.constructor === Object
                        )
                    )
                    && gettingResource !== true
                )
                    ? null
                    : (
                        <>
                            <PageTitle text={resourceName} actions={actions} />
                            <Row>
                                <Col className="col-md-12">
                                    <Card className="card-accent-warning">
                                        <CardBody>
                                            {
                                                gettingResource
                                                    ? <SpinnerLoader />
                                                    : <ResourceForm
                                                        onInputChange={updateInputValue}
                                                        onSubmit={handleUpdateResource}
                                                        resource={resource}
                                                        submitButtonClassName="warning"
                                                        submitButtonDisabled={resourceUnchanged || updatingResource}
                                                        submitButtonIconClassName={updateButtonIconClassName}
                                                        submitButtonText="Update"
                                                    />
                                            }
                                        </CardBody>
                                    </Card>
                                </Col>
                                {
                                    canDestroy
                                    ? (
                                        <DestroyResourceModal
                                            destroyButtonIconClassName={destroyButtonIconClassName}
                                            disabled={destroyingResource}
                                            isOpen={isDestroyResourceModalOpen}
                                            onDestroyButtonClick={handleDestroyResource}
                                            toggle={toggleDestroyResourceModal}
                                        />
                                    )
                                    : null
                                }
                            </Row>
                        </>
                    )
            }
        </div>
    );
};

EditResource.propTypes = {
    actions: PropTypes.array,
    canDestroy: PropTypes.bool,
    destroyingResource: PropTypes.bool,
    errors: PropTypes.array,
    gettingResource: PropTypes.bool,
    handleDestroyResource: PropTypes.func,
    handleUpdateResource: PropTypes.func,
    isDestroyResourceModalOpen: PropTypes.bool,
    resource: PropTypes.object,
    resourceUnchanged: PropTypes.bool,
    toggleDestroyResourceModal: PropTypes.func,
    updateInputValue: PropTypes.func,
    updatingResource: PropTypes.bool,
};

export default EditResource;
