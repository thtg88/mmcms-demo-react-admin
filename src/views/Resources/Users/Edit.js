import React from 'react';
import EditResource, { withEditResource } from '../../../components/Resources/EditResource';
import rolesReducers from '../../../redux/roles/reducers';
import rolesSagas from '../../../redux/roles/sagas';
import { reducerName as rolesReducerName } from '../../../redux/roles/schema';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    recoverResource,
    updateResource,
} from '../../../redux/users/actions';
import reducers from '../../../redux/users/reducers';
import sagas from '../../../redux/users/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    canRestore,
    canUpdate,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/users/schema';

const additionalSagas = {
    [rolesReducerName]: rolesSagas,
};

const additionalReducers = {
    [rolesReducerName]: rolesReducers,
};

export const Edit = ({
    gettingResource,
    isRecovering,
    toggleDestroyResourceModal,
    toggleRecoverResourceModal,
    ...props
}) => {
    const actions = [];
    if(isRecovering === true && canRestore === true) {
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
        <EditResource
            {...props}
            actions={actions}
            canDestroy={canDestroy}
            canUpdate={canUpdate}
            gettingResource={gettingResource}
            isRecovering={isRecovering}
            resourceNameField={nameField}
            toggleDestroyResourceModal={toggleDestroyResourceModal}
            toggleRecoverResourceModal={toggleRecoverResourceModal}
        />
    );
};

export default withEditResource({
    additionalReducers,
    additionalSagas,
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
