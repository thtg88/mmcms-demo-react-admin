import React from 'react';
import CreateResource from '../CreateResource';
import withCreateResource from '../withCreateResource';
import reducerRegistry from '../../../redux/reducerRegistry';
import {
    clearMetadataResourceCreate,
    createResource,
    reducerName,
} from '../../../redux/roles/actions';
import roles from '../../../redux/roles/reducers';
import schema from '../../../redux/roles/schema';

reducerRegistry.register(reducerName, roles);

export const Create = ({
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

export default withCreateResource(
    Create,
    {
        clearMetadataResourceCreate,
        createResource,
        resourceBaseRoute: reducerName,
        schema,
        subStateName: reducerName,
    }
);
