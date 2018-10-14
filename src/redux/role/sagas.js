import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import {
    createRole,
    destroyRole,
    getPaginatedRoles,
    getRole,
    updateRole
} from './helper';

export function* createRoleRequest() {
    yield takeEvery(actions.CREATE_ROLE_REQUEST, function*({ payload }) {
        // console.log('createRole taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(createRole, data);
            // console.log('createRole result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.CREATE_ROLE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.CREATE_ROLE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('createRole error caught: ', err);
            yield put({
                type: actions.CREATE_ROLE_ERROR,
                error: err
            });
        }
    });
}

export function* createRoleSuccess() {
    yield takeEvery(actions.CREATE_ROLE_SUCCESS, function*({ payload }) {});
}

export function* createRoleError() {
    yield takeEvery(actions.CREATE_ROLE_ERROR, function*() {});
}

export function* destroyRoleRequest() {
    yield takeEvery(actions.DESTROY_ROLE_REQUEST, function*({ payload }) {
        // console.log('destroyRole taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(destroyRole, data);
            // console.log('destroyRole result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.DESTROY_ROLE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.DESTROY_ROLE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('destroyRole error caught: ', err);
            yield put({
                type: actions.DESTROY_ROLE_ERROR,
                error: err
            });
        }
    });
}

export function* destroyRoleSuccess() {
    yield takeEvery(actions.DESTROY_ROLE_SUCCESS, function*({ payload }) {});
}

export function* destroyRoleError() {
    yield takeEvery(actions.DESTROY_ROLE_ERROR, function*() {});
}

export function* getPaginatedRolesRequest() {
    yield takeEvery(actions.GET_PAGINATED_ROLES_REQUEST, function*({ payload }) {
        // console.log('getPaginatedRoles taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(getPaginatedRoles, data);
            // console.log('getPaginatedRoles result: ', result);
            if (result.data) {
                yield put({
                    type: actions.GET_PAGINATED_ROLES_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.GET_PAGINATED_ROLES_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('getPaginatedRoles error caught: ', err);
            yield put({
                type: actions.GET_PAGINATED_ROLES_ERROR,
                error: err
            });
        }
    });
}

export function* getPaginatedRolesSuccess() {
    yield takeEvery(actions.GET_PAGINATED_ROLES_SUCCESS, function*({ payload }) {});
}

export function* getPaginatedRolesError() {
    yield takeEvery(actions.GET_PAGINATED_ROLES_ERROR, function*() {});
}

export function* getRoleRequest() {
    yield takeEvery(actions.GET_ROLE_REQUEST, function*({ payload }) {
        // console.log('getRole taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(getRole, data);
            // console.log('getRole result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.GET_ROLE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.GET_ROLE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('getRole error caught: ', err);
            yield put({
                type: actions.GET_ROLE_ERROR,
                error: err
            });
        }
    });
}

export function* getRoleSuccess() {
    yield takeEvery(actions.GET_ROLE_SUCCESS, function*({ payload }) {});
}

export function* getRoleError() {
    yield takeEvery(actions.GET_ROLE_ERROR, function*() {});
}

export function* updateRoleRequest() {
    yield takeEvery(actions.UPDATE_ROLE_REQUEST, function*({ payload }) {
        // console.log('updateRole taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(updateRole, data);
            // console.log('updateRole result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.UPDATE_ROLE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.UPDATE_ROLE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('updateRole error caught: ', err);
            yield put({
                type: actions.UPDATE_ROLE_ERROR,
                error: err
            });
        }
    });
}

export function* updateRoleSuccess() {
    yield takeEvery(actions.UPDATE_ROLE_SUCCESS, function*({ payload }) {});
}

export function* updateRoleError() {
    yield takeEvery(actions.UPDATE_ROLE_ERROR, function*() {});
}

export default function* rootSaga() {
    yield all([
        fork(createRoleRequest),
        fork(createRoleSuccess),
        fork(createRoleError),
        fork(destroyRoleRequest),
        fork(destroyRoleSuccess),
        fork(destroyRoleError),
        fork(getPaginatedRolesRequest),
        fork(getPaginatedRolesSuccess),
        fork(getPaginatedRolesError),
        fork(getRoleRequest),
        fork(getRoleSuccess),
        fork(getRoleError),
        fork(updateRoleRequest),
        fork(updateRoleSuccess),
        fork(updateRoleError),
    ]);
}
