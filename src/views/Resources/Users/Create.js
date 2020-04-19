import React from 'react';
import CreateResource, { withCreateResource } from '../../../components/Resources/CreateResource';
import rolesReducers from '../../../redux/roles/reducers';
import rolesSagas from '../../../redux/roles/sagas';
import { reducerName as rolesReducerName } from '../../../redux/roles/schema';
import {
    clearMetadataResourceCreate,
    createResource,
} from '../../../redux/users/actions';
import reducers from '../../../redux/users/reducers';
import sagas from '../../../redux/users/sagas';
import {
    attributesSequenceToShow,
    nameField,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/users/schema';

const additionalSagas = {
    [rolesReducerName]: rolesSagas,
};

const additionalReducers = {
    [rolesReducerName]: rolesReducers,
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
