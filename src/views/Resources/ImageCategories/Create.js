import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/imageCategories/actions';
import {
    attributesSequenceToShow,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/imageCategories/schema';

export const Create = props => <CreateResource {...props} resourceDisplayName={resourceDisplayName} />;

export default withCreateResource({
    attributesSequenceToShow,
    clearMetadataResourceCreate,
    createResource,
    resourceBaseRoute,
    schema,
    reducerName,
})(Create);
