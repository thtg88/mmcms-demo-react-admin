import React from 'react';
import EditResourceContainer, { withEditResource } from '../../../components/Resources/EditResource';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    recoverResource,
    updateResource,
} from '../../../redux/roles/actions';
import reducers from '../../../redux/roles/reducers';
import sagas from '../../../redux/roles/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/roles/schema';

export const Edit = ({
    gettingResource,
    isRecovering,
    toggleDestroyResourceModal,
    toggleRecoverResourceModal,
    ...props
}) => {
    const actions = [];
    if(isRecovering === true) {
        actions.push({
            className: 'btn-success',
            disabled: gettingResource,
            iconClassName: 'fa fa-fw fa-check',
            onClick: toggleRecoverResourceModal,
            title: 'Recover '+resourceDisplayName,
            type: 'button',
        });
    } else if(canDestroy === true) {
        actions.push({
            className: 'btn-danger',
            disabled: gettingResource,
            iconClassName: 'fa fa-trash',
            onClick: toggleDestroyResourceModal,
            title: 'Remove '+resourceDisplayName,
            type: 'button',
        });
    }

    return (
        <EditResourceContainer
            {...props}
            actions={actions}
            canDestroy={canDestroy}
            gettingResource={gettingResource}
            isRecovering={isRecovering}
            resourceBaseRoute={resourceBaseRoute}
            resourceDisplayName={resourceDisplayName}
            resourceNameField={nameField}
            toggleDestroyResourceModal={toggleDestroyResourceModal}
            toggleRecoverResourceModal={toggleRecoverResourceModal}
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
    reducers,
    resourceBaseRoute,
    resourceDisplayName,
    sagas,
    schema,
    updateResource,
})(Edit);
