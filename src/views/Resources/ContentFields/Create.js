import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/contentFields/actions';
import reducers from '../../../redux/contentFields/reducers';
import sagas from '../../../redux/contentFields/sagas';
import {
    attributesSequenceToShow,
    redirectUrlAfterCreate,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentFields/schema';
import contentModelsReducers from '../../../redux/contentModels/reducers';
import contentModelsSagas from '../../../redux/contentModels/sagas';
import {
    reducerName as contentModelsReducerName,
} from '../../../redux/contentModels/schema';
import contentTypesReducers from '../../../redux/contentTypes/reducers';
import contentTypesSagas from '../../../redux/contentTypes/sagas';
import {
    reducerName as contentTypesReducerName,
} from '../../../redux/contentTypes/schema';

const additionalSagas = {
    [contentTypesReducerName]: contentTypesSagas,
    [contentModelsReducerName]: contentModelsSagas,
};

const additionalReducers = {
    [contentTypesReducerName]: contentTypesReducers,
    [contentModelsReducerName]: contentModelsReducers,
};

export const Create = props => <CreateResource {...props} resourceDisplayName={resourceDisplayName} />;

export default withCreateResource({
    additionalSagas,
    additionalReducers,
    attributesSequenceToShow,
    clearMetadataResourceCreate,
    createResource,
    schema,
    redirectUrlAfterCreate,
    reducers,
    reducerName,
    resourceBaseRoute,
    sagas,
})(Create);
