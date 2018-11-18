import React, { Component } from 'react';
import CreateResource from '../CreateResource';
import withCreateResource from '../withCreateResource';
import {
    clearMetadataResourceCreate,
    createResource,
    reducerName,
} from '../../../redux/users/actions';
import schema from '../../../redux/users/schema';

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
