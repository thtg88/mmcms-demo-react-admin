import { all, fork } from 'redux-saga/effects';
import actions from './actions';
import {
    createResource,
    destroyResource,
    findResource,
    getAllResources,
    getPaginatedResources,
    publishResource,
    recoverResource,
    searchResources,
    unpublishResource,
    updateResource,
} from './helper';
import {
    createResourceRequestBase,
    destroyResourceRequestBase,
    findResourceRequestBase,
    getAllResourcesRequestBase,
    getPaginatedResourcesRequestBase,
    publishResourceRequestBase,
    recoverResourceRequestBase,
    searchResourcesRequestBase,
    unpublishResourceRequestBase,
    updateResourceRequestBase,
} from '../base/sagas';

export const createResourceRequest = createResourceRequestBase(actions, createResource);

export const destroyResourceRequest = destroyResourceRequestBase(actions, destroyResource);

export const findResourceRequest = findResourceRequestBase(actions, findResource);

export const getAllResourcesRequest = getAllResourcesRequestBase(actions, getAllResources);

export const getPaginatedResourcesRequest = getPaginatedResourcesRequestBase(actions, getPaginatedResources);

export const publishResourceRequest = publishResourceRequestBase(actions, publishResource);

export const recoverResourceRequest = recoverResourceRequestBase(actions, recoverResource);

export const searchResourcesRequest = searchResourcesRequestBase(actions, searchResources);

export const unpublishResourceRequest = unpublishResourceRequestBase(actions, unpublishResource);

export const updateResourceRequest = updateResourceRequestBase(actions, updateResource);

export default function* rootSaga() {
    yield all([
        fork(createResourceRequest),
        fork(destroyResourceRequest),
        fork(findResourceRequest),
        fork(getAllResourcesRequest),
        fork(getPaginatedResourcesRequest),
        fork(publishResourceRequest),
        fork(recoverResourceRequest),
        fork(searchResourcesRequest),
        fork(unpublishResourceRequest),
        fork(updateResourceRequest),
    ]);
}
