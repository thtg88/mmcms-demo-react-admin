import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import {
    clearMetadataResourceCreate,
    createResource,
    reducerName,
} from '../../../redux/imageCategories/actions';
import {
    attributesSequenceToShow,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/imageCategories/schema';

export const Create = ({
    creating_resource,
    errors,
    handleCreateResource,
    resource,
    resourceUnchanged,
    updateInputValue,
}) => {
    return (
        <CreateResource
            creatingResource={creating_resource}
            errors={errors}
            handleCreateResource={handleCreateResource}
            resource={resource}
            resourceDisplayName={resourceDisplayName}
            resourceUnchanged={resourceUnchanged}
            updateInputValue={updateInputValue}
        />
    );
};

export default withCreateResource({
    attributesSequenceToShow,
    clearMetadataResourceCreate,
    createResource,
    resourceBaseRoute,
    schema,
    reducerName,
})(Create);
