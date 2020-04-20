import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import contentMigrationMethodsReducers from '../../../redux/contentMigrationMethods/reducers';
import contentMigrationMethodsSagas from '../../../redux/contentMigrationMethods/sagas';
import {
    reducerName as contentMigrationMethodsReducerName,
} from '../../../redux/contentMigrationMethods/schema';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/contentTypes/actions';
import reducers from '../../../redux/contentTypes/reducers';
import sagas from '../../../redux/contentTypes/sagas';
import {
    attributesSequenceToShow,
    nameField,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentTypes/schema';

const additionalSagas = {
    [contentMigrationMethodsReducerName]: contentMigrationMethodsSagas,
};

const additionalReducers = {
    [contentMigrationMethodsReducerName]: contentMigrationMethodsReducers,
};

export const Create = props => <CreateResource {...props} resourceDisplayName={resourceDisplayName} />;

export default withCreateResource({
    additionalReducers,
    additionalSagas,
    attributesSequenceToShow,
    clearMetadataResourceCreate,
    createResource,
    nameField,
    reducerName,
    reducers,
    resourceBaseRoute,
    resourceDisplayName,
    sagas,
    schema,
})(Create);
