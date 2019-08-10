import React from 'react';
import EditResource, { withEditResource } from '../../../components/Resources/EditResource';
import reducerRegistry from '../../../redux/reducerRegistry';
import sagaRegistry from '../../../redux/sagaRegistry';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    recoverResource,
    updateResource,
} from '../../../redux/users/actions';
import reducer from '../../../redux/users/reducers';
import sagas from '../../../redux/users/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/users/schema';

reducerRegistry.register(reducerName, reducer);
sagaRegistry.register(reducerName, sagas);

export const Edit = ({
    gettingResource,
    toggleDestroyResourceModal,
    ...props,
}) => {
    let actions = [];
    if(canDestroy === true) {
        actions.push({
            className: 'btn-danger',
            disabled: gettingResource,
            iconClassName: 'fa fa-trash',
            onClick: toggleDestroyResourceModal,
            title: 'Remove Resource',
            type: 'button',
        });
    }

    return (
        <EditResource
            {...props}
            actions={actions}
            canDestroy={canDestroy}
            gettingResource={gettingResource}
            resourceNameField={nameField}
            toggleDestroyResourceModal={toggleDestroyResourceModal}
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
    recoverResource,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
    updateResource,
})(Edit);
