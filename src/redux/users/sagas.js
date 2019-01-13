import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import {
    createResource,
    destroyResource,
    findResource,
    getPaginatedResources,
    updateResource
} from './helper';

export function* createResourceRequest() {
    yield takeEvery(actions.CREATE_RESOURCE_REQUEST, function* ({ payload }) {

        const { data } = payload;

        try {
            const result = yield call(createResource, data);

            if (result.resource) {
                yield put({
                    type: actions.CREATE_RESOURCE_SUCCESS,
                    payload: result,
                });
            } else {
                yield put({
                    type: actions.CREATE_RESOURCE_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            yield put({
                type: actions.CREATE_RESOURCE_ERROR,
                error: err,
            });
        }
    });
}

export function* destroyResourceRequest() {
    yield takeEvery(actions.DESTROY_RESOURCE_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(destroyResource, data);

            if (result.resource) {
                yield put({
                    type: actions.DESTROY_RESOURCE_SUCCESS,
                    payload: result,
                });
            } else {
                yield put({
                    type: actions.DESTROY_RESOURCE_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            yield put({
                type: actions.DESTROY_RESOURCE_ERROR,
                error: err,
            });
        }
    });
}

export function* findResourceRequest() {
    yield takeEvery(actions.FIND_RESOURCE_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(findResource, data);

            if (result.resource) {
                yield put({
                    type: actions.FIND_RESOURCE_SUCCESS,
                    payload: result,
                });
            } else {
                yield put({
                    type: actions.FIND_RESOURCE_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            yield put({
                type: actions.FIND_RESOURCE_ERROR,
                error: err,
            });
        }
    });
}

export function* getPaginatedResourcesRequest() {
    yield takeEvery(actions.GET_PAGINATED_RESOURCES_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(getPaginatedResources, data);

            if (result.data) {
                yield put({
                    type: actions.GET_PAGINATED_RESOURCES_SUCCESS,
                    payload: result,
                });
            } else {
                yield put({
                    type: actions.GET_PAGINATED_RESOURCES_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            yield put({
                type: actions.GET_PAGINATED_RESOURCES_ERROR,
                error: err,
            });
        }
    });
}

export function* updateResourceRequest() {
    yield takeEvery(actions.UPDATE_RESOURCE_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(updateResource, data);

            if (result.resource) {
                yield put({
                    type: actions.UPDATE_RESOURCE_SUCCESS,
                    payload: result,
                });
            } else {
                yield put({
                    type: actions.UPDATE_RESOURCE_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            yield put({
                type: actions.UPDATE_RESOURCE_ERROR,
                error: err,
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(createResourceRequest),
        fork(destroyResourceRequest),
        fork(findResourceRequest),
        fork(getPaginatedResourcesRequest),
        fork(updateResourceRequest),
    ]);
}
