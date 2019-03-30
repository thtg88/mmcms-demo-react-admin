import React from 'react';
import { Redirect } from 'react-router-dom';
import EditResource, { withEditResource } from '../../../components/Resources/EditResource';
import reducerRegistry from '../../../redux/reducerRegistry';
import sagaRegistry from '../../../redux/sagaRegistry';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    reducerName,
    updateResource,
} from '../../../redux/roles/actions';
import reducer from '../../../redux/roles/reducers';
import sagas from '../../../redux/roles/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    nameField,
    pageSize,
    schema,
} from '../../../redux/roles/schema';

reducerRegistry.register(reducerName, reducer);
sagaRegistry.register(reducerName, sagas);

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
            resourceNameField={nameField}
            resourceUnchanged={resource_unchanged}
            toggleDestroyResourceModal={toggleDestroyResourceModal}
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
    nameField,
    pageSize,
    reducerName,
    schema,
    updateResource,
})(Edit);
