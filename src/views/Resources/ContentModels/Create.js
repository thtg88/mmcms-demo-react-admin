import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/contentModels/actions';
import reducers from '../../../redux/contentModels/reducers';
import sagas from '../../../redux/contentModels/sagas';
import {
    attributesSequenceToShow,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentModels/schema';

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
