import React from 'react';
import { Redirect } from 'react-router-dom';
import EditResource from '../../../components/Resources/EditResource';
import withEditResource from '../../../components/Resources/EditResource/withEditResource';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    recoverResource,
    reducerName,
    updateResource,
} from '../../../redux/imageCategories/actions';
import {
    attributesSequenceToShow,
    canDestroy,
    nameField,
    pageSize,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/imageCategories/schema';

export const Edit = ({
    destroyed,
    destroying_resource,
    errors,
    getting_resource,
    handleDestroyResource,
    handleRecoverResource,
    handleUpdateResource,
    isDestroyResourceModalOpen,
    isRecovering,
    isRecoverResourceModalOpen,
    recoveringResource,
    resource,
    resourceUnchanged,
    toggleDestroyResourceModal,
    toggleRecoverResourceModal,
    updateInputValue,
    updating_resource,
}) => {
    let actions = [];
    if(isRecovering === true) {
        actions.push({
            className: 'btn-success',
            disabled: getting_resource,
            iconClassName: 'fa fa-fw fa-check',
            onClick: toggleRecoverResourceModal,
            title: 'Recover '+resourceDisplayName,
            type: 'button',
        });
    } else if(canDestroy === true) {
        actions.push({
            className: 'btn-danger',
            disabled: getting_resource,
            iconClassName: 'fa fa-fw fa-trash',
            onClick: toggleDestroyResourceModal,
            title: 'Remove '+resourceDisplayName,
            type: 'button',
        });
    }

    if(destroyed === true) {
        return <Redirect to={`/${resourceBaseRoute}`} />;
    }

    return (
        <EditResource
            actions={actions}
            canDestroy={canDestroy}
            destroyingResource={destroying_resource}
            errors={errors}
            gettingResource={getting_resource}
            handleDestroyResource={handleDestroyResource}
            handleRecoverResource={handleRecoverResource}
            handleUpdateResource={handleUpdateResource}
            isDestroyResourceModalOpen={isDestroyResourceModalOpen}
            isRecoverResourceModalOpen={isRecoverResourceModalOpen}
            isRecovering={isRecovering}
            recoveringResource={recoveringResource}
            resource={resource}
            resourceDisplayName={resourceDisplayName}
            resourceNameField={nameField}
            resourceUnchanged={resourceUnchanged}
            toggleDestroyResourceModal={toggleDestroyResourceModal}
            toggleRecoverResourceModal={toggleRecoverResourceModal}
            updateInputValue={updateInputValue}
            updatingResource={updating_resource}
        />
    );
};

export default withEditResource({
    attributesSequenceToShow,
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    pageSize,
    recoverResource,
    resourceDisplayName,
    schema,
    updateResource,
    resourceBaseRoute,
    reducerName,
})(Edit);
