import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/contentMigrationMethods/actions';
import reducers from '../../../redux/contentMigrationMethods/reducers';
import sagas from '../../../redux/contentMigrationMethods/sagas';
import {
    attributesSequenceToShow,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentMigrationMethods/schema';

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
