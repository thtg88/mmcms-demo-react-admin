import React from 'react';
import PropTypes from 'prop-types';
import DestroyResourceModal from '../DestroyResourceModal';
import PublishResourceModal from '../PublishResourceModal';
import RecoverResourceModal from '../RecoverResourceModal';
import RegenerateResourceModal from '../RegenerateResourceModal';
import UnpublishResourceModal from '../UnpublishResourceModal';

const EditResourceModals = ({
    canDestroy,
    destroyingResource,
    handleDestroyResource,
    handlePublishResource,
    handleRecoverResource,
    handleRegenerateResource,
    handleUnpublishResource,
    isDestroyResourceModalOpen,
    isPublishResourceModalOpen,
    isRecovering,
    isRecoverResourceModalOpen,
    isRegenerateResourceModalOpen,
    isUnpublishResourceModalOpen,
    publishingResource,
    regeneratingResource,
    recoveringResource,
    resourceDisplayName,
    toggleDestroyResourceModal,
    togglePublishResourceModal,
    toggleRecoverResourceModal,
    toggleRegenerateResourceModal,
    toggleUnpublishResourceModal,
    unpublishingResource,
}) => {
    const destroyButtonIconClassName = destroyingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-trash';
    const publishButtonIconClassName = publishingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-toggle-on';
    const recoverButtonIconClassName = recoveringResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-check';
    const regenerateButtonIconClassName = regeneratingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-refresh';
    const unpublishButtonIconClassName = unpublishingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-toggle-off';

    return (
        <>
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
                            <RegenerateResourceModal
                                regenerateButtonIconClassName={regenerateButtonIconClassName}
                                disabled={regeneratingResource}
                                isOpen={isRegenerateResourceModalOpen}
                                onRegenerateButtonClick={handleRegenerateResource}
                                resourceDisplayName={resourceDisplayName}
                                toggle={toggleRegenerateResourceModal}
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
        </>
    );
};

EditResourceModals.propTypes = {
    canDestroy: PropTypes.bool,
    destroyingResource: PropTypes.bool,
    handleDestroyResource: PropTypes.func,
    handlePublishResource: PropTypes.func,
    handleRecoverResource: PropTypes.func,
    handleRegenerateResource: PropTypes.func,
    handleUnpublishResource: PropTypes.func,
    isDestroyResourceModalOpen: PropTypes.bool,
    isPublishResourceModalOpen: PropTypes.bool,
    isRecovering: PropTypes.bool,
    isRecoverResourceModalOpen: PropTypes.bool,
    isRegenerateResourceModalOpen: PropTypes.bool,
    isUnpublishResourceModalOpen: PropTypes.bool,
    publishingResource: PropTypes.bool,
    recoveringResource: PropTypes.bool,
    regeneratingResource: PropTypes.bool,
    resourceDisplayName: PropTypes.string,
    toggleDestroyResourceModal: PropTypes.func,
    togglePublishResourceModal: PropTypes.func,
    toggleRecoverResourceModal: PropTypes.func,
    toggleRegenerateResourceModal: PropTypes.func,
    toggleUnpublishResourceModal: PropTypes.func,
    unpublishingResource: PropTypes.bool,
};

export default EditResourceModals;
