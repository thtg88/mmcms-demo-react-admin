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
    yield takeEvery(actions.CREATE_RESOURCE_REQUEST, function*({ payload }) {
        // console.log('createResource taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(createResource, data);
            // console.log('createResource result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.CREATE_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.CREATE_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('createResource error caught: ', err);
            yield put({
                type: actions.CREATE_RESOURCE_ERROR,
                error: err
            });
        }
    });
}

export function* createResourceSuccess() {
    yield takeEvery(actions.CREATE_RESOURCE_SUCCESS, function*({ payload }) {});
}

export function* createResourceError() {
    yield takeEvery(actions.CREATE_RESOURCE_ERROR, function*() {});
}

export function* destroyResourceRequest() {
    yield takeEvery(actions.DESTROY_RESOURCE_REQUEST, function*({ payload }) {
        // console.log('destroyResource taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(destroyResource, data);
            // console.log('destroyResource result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.DESTROY_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.DESTROY_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('destroyResource error caught: ', err);
            yield put({
                type: actions.DESTROY_RESOURCE_ERROR,
                error: err
            });
        }
    });
}

export function* destroyResourceSuccess() {
    yield takeEvery(actions.DESTROY_RESOURCE_SUCCESS, function*({ payload }) {});
}

export function* destroyResourceError() {
    yield takeEvery(actions.DESTROY_RESOURCE_ERROR, function*() {});
}

export function* findResourceRequest() {
    yield takeEvery(actions.FIND_RESOURCE_REQUEST, function*({ payload }) {
        // console.log('findResource taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(findResource, data);
            // console.log('findResource result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.FIND_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.FIND_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('findResource error caught: ', err);
            yield put({
                type: actions.FIND_RESOURCE_ERROR,
                error: err
            });
        }
    });
}

export function* findResourceSuccess() {
    yield takeEvery(actions.FIND_RESOURCE_SUCCESS, function*({ payload }) {});
}

export function* findResourceError() {
    yield takeEvery(actions.FIND_RESOURCE_ERROR, function*() {});
}

export function* getPaginatedResourcesRequest() {
    yield takeEvery(actions.GET_PAGINATED_RESOURCES_REQUEST, function*({ payload }) {
        // console.log('getPaginatedResources taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(getPaginatedResources, data);
            // console.log('getPaginatedResources result: ', result);
            if (result.data) {
                yield put({
                    type: actions.GET_PAGINATED_RESOURCES_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.GET_PAGINATED_RESOURCES_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('getPaginatedResources error caught: ', err);
            yield put({
                type: actions.GET_PAGINATED_RESOURCES_ERROR,
                error: err
            });
        }
    });
}

export function* getPaginatedResourcesSuccess() {
    yield takeEvery(actions.GET_PAGINATED_RESOURCES_SUCCESS, function*({ payload }) {});
}

export function* getPaginatedResourcesError() {
    yield takeEvery(actions.GET_PAGINATED_RESOURCES_ERROR, function*() {});
}

export function* updateResourceRequest() {
    yield takeEvery(actions.UPDATE_RESOURCE_REQUEST, function*({ payload }) {
        // console.log('updateResource taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(updateResource, data);
            // console.log('updateResource result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.UPDATE_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.UPDATE_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('updateResource error caught: ', err);
            yield put({
                type: actions.UPDATE_RESOURCE_ERROR,
                error: err
            });
        }
    });
}

export function* updateResourceSuccess() {
    yield takeEvery(actions.UPDATE_RESOURCE_SUCCESS, function*({ payload }) {});
}

export function* updateResourceError() {
    yield takeEvery(actions.UPDATE_RESOURCE_ERROR, function*() {});
}

export default function* rootSaga() {
    yield all([
        fork(createResourceRequest),
        fork(createResourceSuccess),
        fork(createResourceError),
        fork(destroyResourceRequest),
        fork(destroyResourceSuccess),
        fork(destroyResourceError),
        fork(findResourceRequest),
        fork(findResourceSuccess),
        fork(findResourceError),
        fork(getPaginatedResourcesRequest),
        fork(getPaginatedResourcesSuccess),
        fork(getPaginatedResourcesError),
        fork(updateResourceRequest),
        fork(updateResourceSuccess),
        fork(updateResourceError),
    ]);
}
