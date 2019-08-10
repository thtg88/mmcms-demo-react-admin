import { all, fork } from 'redux-saga/effects';
import actions from './actions';
import {
    createResource,
    destroyResource,
    findResource,
    getAllResources,
    getPaginatedResources,
    recoverResource,
    regenerateResource,
    updateResource
} from './helper';
import {
    createResourceRequestBase,
    destroyResourceRequestBase,
    findResourceRequestBase,
    getAllResourcesRequestBase,
    getPaginatedResourcesRequestBase,
    recoverResourceRequestBase,
    regenerateResourceRequestBase,
    updateResourceRequestBase,
} from '../base/sagas';

export const createResourceRequest = createResourceRequestBase(actions, createResource);

export const destroyResourceRequest = destroyResourceRequestBase(actions, destroyResource);

export const findResourceRequest = findResourceRequestBase(actions, findResource);

export const getAllResourcesRequest = getAllResourcesRequestBase(actions, getAllResources);

export const getPaginatedResourcesRequest = getPaginatedResourcesRequestBase(actions, getPaginatedResources);

export const recoverResourceRequest = recoverResourceRequestBase(actions, recoverResource);

export const regenerateResourceRequest = regenerateResourceRequestBase(actions, regenerateResource);

export const updateResourceRequest = updateResourceRequestBase(actions, updateResource);

export default function* rootSaga() {
    yield all([
        fork(createResourceRequest),
        fork(destroyResourceRequest),
        fork(findResourceRequest),
        fork(getAllResourcesRequest),
        fork(getPaginatedResourcesRequest),
        fork(recoverResourceRequest),
        fork(regenerateResourceRequest),
        fork(updateResourceRequest),
    ]);
}
