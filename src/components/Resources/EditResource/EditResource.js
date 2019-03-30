import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from 'reactstrap';
import ApiErrorCard from '../../Cards/ApiErrorCard';
import CreateSeoEntry from '../CreateSeoEntry';
import DestroyResourceModal from '../DestroyResourceModal';
import FormImageCategoryDropzones from '../../FormImageCategoryDropzones';
import PublishResourceModal from '../PublishResourceModal';
import RecoveringResourceCard from '../../Cards/RecoveringResourceCard';
import RecoverResourceModal from '../RecoverResourceModal';
import UnpublishResourceModal from '../UnpublishResourceModal';
import PageTitle from '../../PageTitle';
import ResourceForm from '../ResourceForm';
import SpinnerLoader from '../../SpinnerLoader';

const EditResource = ({
    actions,
    canDestroy,
    creatingSeoEntry,
    destroyingResource,
    errors,
    gettingResource,
    handleCKEditorImageFileUpload,
    handleCreateSeoEntry,
    handleDestroyResource,
    handlePublishResource,
    handleRecoverResource,
    handleUnpublishResource,
    handleUpdateResource,
    handleUpdateSeoEntry,
    hasImages,
    hasSeo,
    images,
    imageErrors,
    imageCategories,
    isDestroyResourceModalOpen,
    isPublishResourceModalOpen,
    isRecoverResourceModalOpen,
    isRecovering,
    isUnpublishResourceModalOpen,
    onImageFileDrop,
    onImageFileRemove,
    publishingResource,
    recoveringResource,
    resource,
    resourceDisplayName,
    resourceNameField,
    resourceUnchanged,
    seoEntry,
    seoEntryErrors,
    seoEntryUnchanged,
    toggleDestroyResourceModal,
    togglePublishResourceModal,
    toggleRecoverResourceModal,
    toggleUnpublishResourceModal,
    unpublishingResource,
    updateInputValue,
    updateSeoInputValue,
    updatingResource,
    updatingSeoEntry,
}) => {
    const [activeTab, setActiveTab] = useState('details');
    const createSeoEntryButtonIconClassName = creatingSeoEntry === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-search-plus';
    const destroyButtonIconClassName = destroyingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-trash';
    const publishButtonIconClassName = publishingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-toggle-on';
    const recoverButtonIconClassName = recoveringResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-check';
    const unpublishButtonIconClassName = unpublishingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-toggle-off';
    const updateButtonIconClassName = updatingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-save';
    const updateSeoEntryButtonIconClassName = updatingSeoEntry === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-save';
    const resourceName = (
        typeof resource === 'undefined'
        || resource === null
        || typeof resource[resourceNameField] === 'undefined'
        || typeof resource[resourceNameField].value === 'undefined'
    )
        ? 'Loading...'
        : resource[resourceNameField].value;
    const wrapTitle = resourceName.length > 24
        ? true
        : false;

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
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                active={activeTab === 'details'}
                                                onClick={() => setActiveTab('details')}
                                            >
                                                <i className="fa fa-fw fa-list"></i>
                                                {' '}
                                                Details
                                            </NavLink>
                                        </NavItem>
                                        {
                                            hasImages === true
                                                ? (
                                                    <NavItem>
                                                        <NavLink
                                                            active={activeTab === 'images'}
                                                            onClick={() => setActiveTab('images')}
                                                        >
                                                            <i className="fa fa-fw fa-image"></i>
                                                            {' '}
                                                            Images
                                                        </NavLink>
                                                    </NavItem>
                                                )
                                                : null
                                        }
                                        {
                                            hasSeo === true
                                                ? (
                                                    <NavItem>
                                                        <NavLink
                                                            active={activeTab === 'seo'}
                                                            onClick={() => setActiveTab('seo')}
                                                        >
                                                            <i className="fa fa-fw fa-search"></i>
                                                            {' '}
                                                            SEO
                                                        </NavLink>
                                                    </NavItem>
                                                )
                                                : null
                                        }
                                    </Nav>
                                    <TabContent activeTab={activeTab} className="mb-4">
                                        <TabPane tabId="details">
                                            {
                                                gettingResource
                                                    ? <SpinnerLoader />
                                                    : (
                                                        <ResourceForm
                                                            isRecovering={isRecovering}
                                                            onCKEditorImageUpload={handleCKEditorImageFileUpload}
                                                            onInputChange={updateInputValue}
                                                            onSubmit={handleUpdateResource}
                                                            resource={resource}
                                                            submitButtonClassName="warning"
                                                            submitButtonDisabled={isRecovering || resourceUnchanged || updatingResource}
                                                            submitButtonIconClassName={updateButtonIconClassName}
                                                            submitButtonText="Update"
                                                        />
                                                    )
                                            }
                                        </TabPane>
                                        {
                                            hasImages === true
                                                ? (
                                                    <TabPane tabId="images">
                                                        <FormImageCategoryDropzones
                                                            imageCategories={imageCategories}
                                                            imageErrors={imageErrors}
                                                            images={images}
                                                            onFileDrop={onImageFileDrop}
                                                            onFileRemove={onImageFileRemove}
                                                        />
                                                    </TabPane>
                                                )
                                                : null
                                        }
                                        {
                                            hasSeo === true
                                                ? (
                                                    <TabPane tabId="seo">
                                                        <Row>
                                                            <Col className="col-md-12">
                                                                <ApiErrorCard errors={seoEntryErrors} />
                                                            </Col>
                                                        </Row>
                                                        {
                                                            seoEntry
                                                                ? (
                                                                    <ResourceForm
                                                                        isRecovering={false}
                                                                        onInputChange={updateSeoInputValue}
                                                                        onSubmit={handleUpdateSeoEntry}
                                                                        resource={seoEntry}
                                                                        submitButtonClassName="warning"
                                                                        submitButtonDisabled={seoEntryUnchanged || updatingSeoEntry}
                                                                        submitButtonIconClassName={updateSeoEntryButtonIconClassName}
                                                                        submitButtonText="Update"
                                                                    />
                                                                )
                                                                : (
                                                                    <CreateSeoEntry
                                                                        buttonIconClassName={createSeoEntryButtonIconClassName}
                                                                        creating={creatingSeoEntry}
                                                                        handleCreate={handleCreateSeoEntry}
                                                                        resourceDisplayName={resourceDisplayName}
                                                                    />
                                                                )
                                                        }
                                                    </TabPane>
                                                )
                                                : null
                                        }
                                    </TabContent>
                                </Col>
                                {
                                    canDestroy
                                        ? (
                                            <DestroyResourceModal
                                                destroyButtonIconClassName={destroyButtonIconClassName}
                                                disabled={destroyingResource}
                                                isOpen={isDestroyResourceModalOpen}
                                                onDestroyButtonClick={handleDestroyResource}
                                                resourceDisplayName={resourceDisplayName}
                                                toggle={toggleDestroyResourceModal}
                                            />
                                        )
                                        : null
                                }
                                {
                                    isRecovering === true
                                        ? (
                                            <RecoverResourceModal
                                                recoverButtonIconClassName={recoverButtonIconClassName}
                                                disabled={recoveringResource}
                                                isOpen={isRecoverResourceModalOpen}
                                                onRecoverButtonClick={handleRecoverResource}
                                                resourceDisplayName={resourceDisplayName}
                                                toggle={toggleRecoverResourceModal}
                                            />
                                        )
                                        : (
                                            <>
                                                <PublishResourceModal
                                                    publishButtonIconClassName={publishButtonIconClassName}
                                                    disabled={publishingResource}
                                                    isOpen={isPublishResourceModalOpen}
                                                    onPublishButtonClick={handlePublishResource}
                                                    resourceDisplayName={resourceDisplayName}
                                                    toggle={togglePublishResourceModal}
                                                />
                                                <UnpublishResourceModal
                                                    unpublishButtonIconClassName={unpublishButtonIconClassName}
                                                    disabled={unpublishingResource}
                                                    isOpen={isUnpublishResourceModalOpen}
                                                    onUnpublishButtonClick={handleUnpublishResource}
                                                    resourceDisplayName={resourceDisplayName}
                                                    toggle={toggleUnpublishResourceModal}
                                                />
                                            </>
                                        )
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
    creatingSeoEntry: PropTypes.bool,
    destroyingResource: PropTypes.bool,
    errors: PropTypes.array,
    gettingResource: PropTypes.bool,
    handleCKEditorImageFileUpload: PropTypes.func,
    handleCreateSeoEntry: PropTypes.func,
    handleDestroyResource: PropTypes.func,
    handlePublishResource: PropTypes.func,
    handleUnpublishResource: PropTypes.func,
    handleUpdateResource: PropTypes.func,
    hasImages: PropTypes.bool,
    images: PropTypes.array,
    imageErrors: PropTypes.array,
    imageCategories: PropTypes.array,
    isDestroyResourceModalOpen: PropTypes.bool,
    isPublishResourceModalOpen: PropTypes.bool,
    isUnpublishResourceModalOpen: PropTypes.bool,
    onImageFileDrop: PropTypes.func,
    publishingResource: PropTypes.bool,
    resource: PropTypes.object,
    resourceDisplayName: PropTypes.string,
    resourceNameField: PropTypes.string.isRequired,
    resourceUnchanged: PropTypes.bool,
    seoEntry: PropTypes.object,
    seoEntryErrors: PropTypes.array,
    toggleDestroyResourceModal: PropTypes.func,
    togglePublishResourceModal: PropTypes.func,
    toggleUnpublishResourceModal: PropTypes.func,
    unpublishingResource: PropTypes.bool,
    updateInputValue: PropTypes.func,
    updatingResource: PropTypes.bool,
};

export default EditResource;
