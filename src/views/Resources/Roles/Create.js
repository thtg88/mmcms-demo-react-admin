import React from 'react';
import CreateResource from '../../../components/Resources/CreateResource';
import withCreateResource from '../../../components/Resources/CreateResource/withCreateResource';
import reducerRegistry from '../../../redux/reducerRegistry';
import sagaRegistry from '../../../redux/sagaRegistry';
import {
    clearMetadataResourceCreate,
    createResource,
    reducerName,
} from '../../../redux/roles/actions';
import reducer from '../../../redux/roles/reducers';
import sagas from '../../../redux/roles/sagas';
import schema from '../../../redux/roles/schema';

reducerRegistry.register(reducerName, reducer);
sagaRegistry.register(reducerName, sagas);

export const Create = ({
    creating_resource,
    errors,
    handleCreateResource,
    resource,
    resource_unchanged,
    updateInputValue,
}) => {
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

export default withCreateResource({
    clearMetadataResourceCreate,
    createResource,
    schema,
    resourceBaseRoute: reducerName,
    subStateName: reducerName,
})(Create);
