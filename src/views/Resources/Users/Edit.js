import React from 'react';
import { Redirect } from 'react-router-dom';
import EditResource from '../EditResource';
import withEditResource from '../withEditResource';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    reducerName,
    updateResource,
} from '../../../redux/users/actions';
import schema from '../../../redux/users/schema';
import { pageSize } from './tableConfig';

const canDestroy = true;

export const Edit = ({
    destroyed,
    destroying_resource,
    errors,
    getting_resource,
    handleDestroyResource,
    handleUpdateResource,
    is_modal_open,
    resource,
    resource_unchanged,
    toggleDestroyResourceModal,
    updateInputValue,
    updating_resource,
}) => {
    let actions = [];
    if(canDestroy === true) {
        actions.push({
            className: 'btn-danger',
            disabled: getting_resource,
            iconClassName: 'fa fa-trash',
            onClick: toggleDestroyResourceModal,
            title: 'Remove Resource',
            type: 'button',
        });
    }

    if(destroyed === true) {
        return <Redirect to={`/${reducerName}`} />;
    }

    return (
        <EditResource
            actions={actions}
            canDestroy={canDestroy}
            destroyingResource={destroying_resource}
            errors={errors}
            gettingResource={getting_resource}
            handleDestroyResource={handleDestroyResource}
            handleUpdateResource={handleUpdateResource}
            isDestroyResourceModalOpen={is_modal_open}
            resource={resource}
            resourceUnchanged={resource_unchanged}
            toggleDestroyResourceModal={toggleDestroyResourceModal}
            updateInputValue={updateInputValue}
            updatingResource={updating_resource}
        />
    );
};

export default withEditResource(
    Edit,
    {
        clearMetadataResourceEdit,
        destroyResource,
        findResource,
        getPaginatedResources,
        pageSize,
        schema,
        subStateName: reducerName,
        updateResource,
    }
);
