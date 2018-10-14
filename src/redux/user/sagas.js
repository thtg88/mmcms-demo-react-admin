import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import {
    createUser,
    destroyUser,
    getPaginatedUsers,
    getUser,
    updateUser
} from './helper';

export function* createUserRequest() {
    yield takeEvery(actions.CREATE_USER_REQUEST, function*({ payload }) {
        // console.log('createUser taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(createUser, data);
            // console.log('createUser result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.CREATE_USER_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.CREATE_USER_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('createUser error caught: ', err);
            yield put({
                type: actions.CREATE_USER_ERROR,
                error: err
            });
        }
    });
}

export function* createUserSuccess() {
    yield takeEvery(actions.CREATE_USER_SUCCESS, function*({ payload }) {});
}

export function* createUserError() {
    yield takeEvery(actions.CREATE_USER_ERROR, function*() {});
}

export function* destroyUserRequest() {
    yield takeEvery(actions.DESTROY_USER_REQUEST, function*({ payload }) {
        // console.log('destroyUser taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(destroyUser, data);
            // console.log('destroyUser result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.DESTROY_USER_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.DESTROY_USER_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('destroyUser error caught: ', err);
            yield put({
                type: actions.DESTROY_USER_ERROR,
                error: err
            });
        }
    });
}

export function* destroyUserSuccess() {
    yield takeEvery(actions.DESTROY_USER_SUCCESS, function*({ payload }) {});
}

export function* destroyUserError() {
    yield takeEvery(actions.DESTROY_USER_ERROR, function*() {});
}

export function* getPaginatedUsersRequest() {
    yield takeEvery(actions.GET_PAGINATED_USERS_REQUEST, function*({ payload }) {
        // console.log('getPaginatedUsers taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(getPaginatedUsers, data);
            // console.log('getPaginatedUsers result: ', result);
            if (result.data) {
                yield put({
                    type: actions.GET_PAGINATED_USERS_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.GET_PAGINATED_USERS_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('getPaginatedUsers error caught: ', err);
            yield put({
                type: actions.GET_PAGINATED_USERS_ERROR,
                error: err
            });
        }
    });
}

export function* getPaginatedUsersSuccess() {
    yield takeEvery(actions.GET_PAGINATED_USERS_SUCCESS, function*({ payload }) {});
}

export function* getPaginatedUsersError() {
    yield takeEvery(actions.GET_PAGINATED_USERS_ERROR, function*() {});
}

export function* getUserRequest() {
    yield takeEvery(actions.GET_USER_REQUEST, function*({ payload }) {
        // console.log('getUser taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(getUser, data);
            // console.log('getUser result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.GET_USER_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.GET_USER_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('getUser error caught: ', err);
            yield put({
                type: actions.GET_USER_ERROR,
                error: err
            });
        }
    });
}

export function* getUserSuccess() {
    yield takeEvery(actions.GET_USER_SUCCESS, function*({ payload }) {});
}

export function* getUserError() {
    yield takeEvery(actions.GET_USER_ERROR, function*() {});
}

export function* updateUserRequest() {
    yield takeEvery(actions.UPDATE_USER_REQUEST, function*({ payload }) {
        // console.log('updateUser taken!', payload);
        const { data } = payload;
        // console.log('data', data);
        try {
            const result = yield call(updateUser, data);
            // console.log('updateUser result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.UPDATE_USER_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.UPDATE_USER_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('updateUser error caught: ', err);
            yield put({
                type: actions.UPDATE_USER_ERROR,
                error: err
            });
        }
    });
}

export function* updateUserSuccess() {
    yield takeEvery(actions.UPDATE_USER_SUCCESS, function*({ payload }) {});
}

export function* updateUserError() {
    yield takeEvery(actions.UPDATE_USER_ERROR, function*() {});
}

export default function* rootSaga() {
    yield all([
        fork(createUserRequest),
        fork(createUserSuccess),
        fork(createUserError),
        fork(destroyUserRequest),
        fork(destroyUserSuccess),
        fork(destroyUserError),
        fork(getPaginatedUsersRequest),
        fork(getPaginatedUsersSuccess),
        fork(getPaginatedUsersError),
        fork(getUserRequest),
        fork(getUserSuccess),
        fork(getUserError),
        fork(updateUserRequest),
        fork(updateUserSuccess),
        fork(updateUserError),
    ]);
}
