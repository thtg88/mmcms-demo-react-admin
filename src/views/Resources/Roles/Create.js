import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/roles/actions';
import reducers from '../../../redux/roles/reducers';
import sagas from '../../../redux/roles/sagas';
import {
    attributesSequenceToShow,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/roles/schema';

export const Create = props => <CreateResource {...props} resourceDisplayName={resourceDisplayName} />;

export default withCreateResource({
    attributesSequenceToShow,
    clearMetadataResourceCreate,
    createResource,
    schema,
    reducers,
    reducerName,
    resourceBaseRoute,
    sagas,
})(Create);
