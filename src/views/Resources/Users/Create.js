import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import reducerRegistry from '../../../redux/reducerRegistry';
import sagaRegistry from '../../../redux/sagaRegistry';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/users/actions';
import reducer from '../../../redux/users/reducers';
import sagas from '../../../redux/users/sagas';
import {
    attributesSequenceToShow,
    nameField,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/users/schema';

reducerRegistry.register(reducerName, reducer);
sagaRegistry.register(reducerName, sagas);

export const Create = props => <CreateResource {...props} resourceDisplayName={resourceDisplayName} />;

export default withCreateResource({
    attributesSequenceToShow,
    clearMetadataResourceCreate,
    createResource,
    nameField,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
})(Create);
