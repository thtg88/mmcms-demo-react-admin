import { all, fork } from 'redux-saga/effects';
import actions from './actions';
import {
    createResource,
    destroyResource,
    findResource,
    updateResource,
} from './helper';
import {
    createResourceRequestBase,
    destroyResourceRequestBase,
    findResourceRequestBase,
    updateResourceRequestBase,
} from '../base/sagas';

export const createResourceRequest = createResourceRequestBase(actions, createResource);

export const destroyResourceRequest = destroyResourceRequestBase(actions, destroyResource);

export const findResourceRequest = findResourceRequestBase(actions, findResource);

export const updateResourceRequest = updateResourceRequestBase(actions, updateResource);

export default function* rootSaga() {
    yield all([
        fork(createResourceRequest),
        fork(destroyResourceRequest),
        fork(findResourceRequest),
        fork(updateResourceRequest),
    ]);
}
