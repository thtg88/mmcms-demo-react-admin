import React from 'react';
import EditResourceContainer, { withEditResource } from '../../../components/Resources/EditResource';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    updateResource,
} from '../../../redux/contentMigrationMethods/actions';
import reducers from '../../../redux/contentMigrationMethods/reducers';
import sagas from '../../../redux/contentMigrationMethods/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentMigrationMethods/schema';

export const Edit = ({
    gettingResource,
    toggleDestroyResourceModal,
    ...props
}) => {
    const actions = [];
    if(canDestroy === true) {
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
            resourceBaseRoute={resourceBaseRoute}
            resourceDisplayName={resourceDisplayName}
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
    reducerName,
    reducers,
    resourceBaseRoute,
    resourceDisplayName,
    sagas,
    schema,
    updateResource,
})(Edit);