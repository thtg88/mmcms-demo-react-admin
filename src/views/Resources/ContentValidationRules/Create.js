import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/contentValidationRules/actions';
import reducers from '../../../redux/contentValidationRules/reducers';
import sagas from '../../../redux/contentValidationRules/sagas';
import {
    attributesSequenceToShow,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentValidationRules/schema';

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
