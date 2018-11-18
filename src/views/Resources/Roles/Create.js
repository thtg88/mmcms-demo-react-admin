import React from 'react';
import CreateResource from '../CreateResource';
import withCreate from '../withCreate';
import {
    clearMetadataResourceCreate,
    createResource,
    reducerName,
} from '../../../redux/roles/actions';
import schema from '../../../redux/roles/schema';

const Create = ({
    creating_resource,
    errors,
    handleCreateResource,
    resource,
    resource_unchanged,
    updateInputValue,
}) => {
    // console.log('resource', resource);

    return (
        <CreateResource
            creatingResource={creating_resource}
            errors={errors}
            handleCreateResource={handleCreateResource}
            resource={resource}
            resourceUnchanged={resource_unchanged}
            updateInputValue={updateInputValue}
        />
    );
};

export default withCreate(
    Create,
    {
        clearMetadataResourceCreate,
        createResource,
        resourceBaseRoute: reducerName,
        schema,
        subStateName: reducerName,
    }
);
