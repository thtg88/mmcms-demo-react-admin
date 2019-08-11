import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import reducerRegistry from '../../../redux/reducerRegistry';
import sagaRegistry from '../../../redux/sagaRegistry';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/roles/actions';
import reducer from '../../../redux/roles/reducers';
import sagas from '../../../redux/roles/sagas';
import {
    attributesSequenceToShow,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/roles/schema';

reducerRegistry.register(reducerName, reducer);
sagaRegistry.register(reducerName, sagas);

export const Create = props => <CreateResource {...props} resourceDisplayName={resourceDisplayName} />;

export default withCreateResource({
    attributesSequenceToShow,
    clearMetadataResourceCreate,
    createResource,
    schema,
    resourceBaseRoute,
    reducerName,
})(Create);
