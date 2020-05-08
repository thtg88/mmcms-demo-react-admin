import React from 'react';
import EditResourceContainer, { withEditResource } from '../../../components/Resources/EditResource';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    updateResource,
} from '../../../redux/contentFields/actions';
import reducers from '../../../redux/contentFields/reducers';
import sagas from '../../../redux/contentFields/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentFields/schema';
import contentModelsReducers from '../../../redux/contentModels/reducers';
import contentModelsSagas from '../../../redux/contentModels/sagas';
import {
    reducerName as contentModelsReducerName,
    resourceBaseRoute as contentModelsResourceBaseRoute,
} from '../../../redux/contentModels/schema';
import contentTypesReducers from '../../../redux/contentTypes/reducers';
import contentTypesSagas from '../../../redux/contentTypes/sagas';
import {
    reducerName as contentTypesReducerName,
} from '../../../redux/contentTypes/schema';

const additionalSagas = {
    [contentTypesReducerName]: contentTypesSagas,
    [contentModelsReducerName]: contentModelsSagas,
};

const additionalReducers = {
    [contentTypesReducerName]: contentTypesReducers,
    [contentModelsReducerName]: contentModelsReducers,
};

export const Edit = ({
    gettingResource,
    toggleDestroyResourceModal,
    ...props
}) => {
    console.log(props.formSchema.content_type_id);
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
    additionalReducers,
    additionalSagas,
    attributesSequenceToShow,
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    nameField,
    pageSize,
    reducerName,
    reducers,
    resourceDisplayName,
    sagas,
    schema,
    updateResource,
    resourceBaseRoute: `${contentModelsResourceBaseRoute}/:content_model_id/${resourceBaseRoute}`,
})(Edit);
