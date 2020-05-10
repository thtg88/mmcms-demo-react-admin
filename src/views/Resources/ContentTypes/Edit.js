import React from 'react';
import EditResource, { withEditResource } from '../../../components/Resources/EditResource';
import contentMigrationMethodsReducers from '../../../redux/contentMigrationMethods/reducers';
import contentMigrationMethodsSagas from '../../../redux/contentMigrationMethods/sagas';
import { reducerName as contentMigrationMethodsReducerName } from '../../../redux/contentMigrationMethods/schema';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    recoverResource,
    updateResource,
} from '../../../redux/contentTypes/actions';
import reducers from '../../../redux/contentTypes/reducers';
import sagas from '../../../redux/contentTypes/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentTypes/schema';

const additionalSagas = {
    [contentMigrationMethodsReducerName]: contentMigrationMethodsSagas,
};

const additionalReducers = {
    [contentMigrationMethodsReducerName]: contentMigrationMethodsReducers,
};

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
        <EditResource
            {...props}
            actions={actions}
            canDestroy={canDestroy}
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
