import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import ApiErrorCard from '../../Cards/ApiErrorCard';
import ApiWarningCard from '../../Cards/ApiWarningCard';
import EditResourceModals from './EditResourceModals';
import TabsContent from './TabsContent';
import TabsNav from './TabsNav';
import RecoveringResourceCard from '../../Cards/RecoveringResourceCard';
import PageTitle from '../../PageTitle';

const EditResourceContainer = ({
    actions,
    canDestroy,
    destroyingResource,
    dispatchedValuesSearchers,
    errors,
    formSchema,
    gettingResource,
    handleCKEditorImageFileUpload,
    handleDestroyResource,
    handlePublishResource,
    handleRecoverResource,
    handleRegenerateResource,
    handleUnpublishResource,
    handleUpdateResource,
    isDestroyResourceModalOpen,
    isPublishResourceModalOpen,
    isRecovering,
    isRecoverResourceModalOpen,
    isRegenerateResourceModalOpen,
    isUnpublishResourceModalOpen,
    publishingResource,
    recoveringResource,
    regeneratingResource,
    resource,
    resourceDisplayName,
    resourceNameField,
    resourceTableName,
    resourceUnchanged,
    tabs,
    toggleDestroyResourceModal,
    togglePublishResourceModal,
    toggleRecoverResourceModal,
    toggleRegenerateResourceModal,
    toggleUnpublishResourceModal,
    unpublishingResource,
    updateInputValue,
    updatingResource,
    warnings,
}) => {
    const [activeTab, setActiveTab] = useState('details');
    const resourceName = (
        typeof formSchema === 'undefined'
        || formSchema === null
        || typeof formSchema[resourceNameField] === 'undefined'
        || typeof formSchema[resourceNameField].value === 'undefined'
    )
        ? 'Loading...'
        : formSchema[resourceNameField].value;
    const wrapTitle = resourceName.length > 22
        ? true
        : false;

    return (
        <div className="animated fadeIn">
            <Row>
                <Col className="col-md-12">
                    <ApiErrorCard errors={errors} />
                </Col>
            </Row>
            <Row>
                <Col className="col-md-12">
                    <ApiWarningCard warnings={warnings} />
                </Col>
            </Row>
            {
                (
                    (
                        typeof formSchema === 'undefined'
                        || formSchema === null
                        || (
                            Object.keys(formSchema).length === 0
                            && formSchema.constructor === Object
                        )
                    )
                    && gettingResource !== true
                )
                    ? null
                    : (
                        <>
                            <PageTitle
                                text={resourceName}
                                actions={actions}
                                wrap={wrapTitle}
                            />
                            <Row>
                                <Col className="col-md-12">
                                    <RecoveringResourceCard
                                        isRecovering={isRecovering}
                                        resourceDisplayName={resourceDisplayName}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-md-12">
                                    <TabsNav
                                        activeTab={activeTab}
                                        isRecovering={isRecovering}
                                        setActiveTab={setActiveTab}
                                        tabs={tabs}
                                    />
                                    <TabsContent
                                        activeTab={activeTab}
                                        dispatchedValuesSearchers={dispatchedValuesSearchers}
                                        formSchema={formSchema}
                                        gettingResource={gettingResource}
                                        handleCKEditorImageFileUpload={handleCKEditorImageFileUpload}
                                        handleUpdateResource={handleUpdateResource}
                                        isRecovering={isRecovering}
                                        resource={resource}
                                        resourceDisplayName={resourceDisplayName}
                                        resourceTableName={resourceTableName}
                                        resourceUnchanged={resourceUnchanged}
                                        tabs={tabs}
                                        updateInputValue={updateInputValue}
                                        updatingResource={updatingResource}
                                    />
                                </Col>
                                <EditResourceModals
                                    canDestroy={canDestroy}
                                    destroyingResource={destroyingResource}
                                    handleDestroyResource={handleDestroyResource}
                                    handlePublishResource={handlePublishResource}
                                    handleUnpublishResource={handleUnpublishResource}
                                    handleRecoverResource={handleRecoverResource}
                                    handleRegenerateResource={handleRegenerateResource}
                                    isDestroyResourceModalOpen={isDestroyResourceModalOpen}
                                    isPublishResourceModalOpen={isPublishResourceModalOpen}
                                    isRecovering={isRecovering}
                                    isRecoverResourceModalOpen={isRecoverResourceModalOpen}
                                    isRegenerateResourceModalOpen={isRegenerateResourceModalOpen}
                                    isUnpublishResourceModalOpen={isUnpublishResourceModalOpen}
                                    publishingResource={publishingResource}
                                    recoveringResource={recoveringResource}
                                    regeneratingResource={regeneratingResource}
                                    resourceDisplayName={resourceDisplayName}
                                    toggleDestroyResourceModal={toggleDestroyResourceModal}
                                    togglePublishResourceModal={togglePublishResourceModal}
                                    toggleRecoverResourceModal={toggleRecoverResourceModal}
                                    toggleRegenerateResourceModal={toggleRegenerateResourceModal}
                                    toggleUnpublishResourceModal={toggleUnpublishResourceModal}
                                    unpublishingResource={unpublishingResource}
                                />
                            </Row>
                        </>
                    )
            }
        </div>
    );
};

EditResourceContainer.propTypes = {
    actions: PropTypes.array,
    canDestroy: PropTypes.bool,
    destroyingResource: PropTypes.bool,
    dispatchedValuesSearchers: PropTypes.objectOf(PropTypes.func),
    errors: PropTypes.array,
    formSchema: PropTypes.object,
    gettingResource: PropTypes.bool,
    handleCKEditorImageFileUpload: PropTypes.func,
    handleDestroyResource: PropTypes.func,
    handlePublishResource: PropTypes.func,
    handleRecoverResource: PropTypes.func,
    handleRegenerateResource: PropTypes.func,
    handleUnpublishResource: PropTypes.func,
    handleUpdateResource: PropTypes.func,
    isDestroyResourceModalOpen: PropTypes.bool,
    isPublishResourceModalOpen: PropTypes.bool,
    isRecovering: PropTypes.bool,
    isRecoverResourceModalOpen: PropTypes.bool,
    isRegenerateResourceModalOpen: PropTypes.bool,
    isUnpublishResourceModalOpen: PropTypes.bool,
    publishingResource: PropTypes.bool,
    recoveringResource: PropTypes.bool,
    regeneratingResource: PropTypes.bool,
    resource: PropTypes.object,
    resourceDisplayName: PropTypes.string,
    resourceNameField: PropTypes.string.isRequired,
    resourceTableName: PropTypes.string,
    resourceUnchanged: PropTypes.bool,
    tabs: PropTypes.array,
    toggleDestroyResourceModal: PropTypes.func,
    togglePublishResourceModal: PropTypes.func,
    toggleRecoverResourceModal: PropTypes.func,
    toggleRegenerateResourceModal: PropTypes.func,
    toggleUnpublishResourceModal: PropTypes.func,
    unpublishingResource: PropTypes.bool,
    updateInputValue: PropTypes.func,
    updatingResource: PropTypes.bool,
    warnings: PropTypes.array,
};

export default EditResourceContainer;
