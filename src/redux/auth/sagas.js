import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { getProfile, login, logout, register, updateProfile } from './helper';

export function* getProfileRequest() {
    yield takeEvery('GET_PROFILE_REQUEST', function*({ payload }) {
        const { data } = payload;

        // console.log('getProfile taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(getProfile, data);
            console.log('getProfile result: ', result);
            if (result.resource) {
                yield put({
                    type: 'GET_PROFILE_SUCCESS',
                    payload: result
                });
            } else {
                yield put({
                    type: 'GET_PROFILE_ERROR',
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            console.log('getProfile error caught: ', err);
            yield put({
                type: 'GET_PROFILE_ERROR',
                error: err
            });
        }
    });
}

export function* getProfileSuccess() {
    yield takeEvery('GET_PROFILE_SUCCESS', function*({ payload }) {});
}

export function* getProfileError() {
    yield takeEvery('GET_PROFILE_ERROR', function*() {});
}

export function* loginRequest() {
    yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
        const { data } = payload;

        // console.log('login taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(login, data);
            // console.log('login result: ', result);
            if (result.access_token) {
                yield put({
                    type: 'LOGIN_SUCCESS',
                    payload: result
                });
            } else {
                yield put({
                    type: 'LOGIN_ERROR',
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('login error caught: ', err);
            yield put({
                type: 'LOGIN_ERROR',
                error: err
            });
        }
    });
}

export function* loginSuccess() {
    yield takeEvery('LOGIN_SUCCESS', function*({ payload }) {});
}

export function* loginError() {
    yield takeEvery('LOGIN_ERROR', function*() {});
}

export function* logoutRequest() {
    yield takeEvery('LOGOUT_REQUEST', function*({ payload }) {
        const { data } = payload;

        // console.log('logout taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(logout, data);
            // console.log('logout result: ', result);
            yield put({
                type: 'LOGOUT_SUCCESS'
            });

        } catch(err) {
            // console.log(err);
            yield put({
                type: 'LOGOUT_SUCCESS'
            });
        }

    });
}

export function* logoutSuccess() {
    yield takeEvery('LOGOUT_SUCCESS', function*({ payload }) {});
}

export function* logoutError() {
    yield takeEvery('LOGOUT_ERROR', function*() {});
}

export function* registerRequest() {
    yield takeEvery('REGISTER_REQUEST', function*({ payload }) {
        const { data } = payload;

        // console.log('register taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(register, data);

            // console.log('register result: ', result);

            if (result.access_token) {
                yield put({
                    type: 'REGISTER_SUCCESS',
                    payload: result
                });
            } else {
                yield put({
                    type: 'REGISTER_ERROR',
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('register error caught: ', err);
            yield put({
                type: 'REGISTER_ERROR',
                error: err
            });
        }
    });
}

export function* registerSuccess() {
    yield takeEvery('REGISTER_SUCCESS', function*({ payload }) {});
}

export function* registerError() {
    yield takeEvery('REGISTER_ERROR', function*() {});
}

export function* updateProfileRequest() {
    yield takeEvery('UPDATE_PROFILE_REQUEST', function*({ payload }) {
        const { data } = payload;

        // console.log('updateProfile taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(updateProfile, data);

            // console.log('updateProfile result: ', result);

            if (result.resource) {
                yield put({
                    type: 'UPDATE_PROFILE_SUCCESS',
                    payload: result
                });
            } else {
                yield put({
                    type: 'UPDATE_PROFILE_ERROR',
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('updateProfile error caught: ', err);
            yield put({
                type: 'UPDATE_PROFILE_ERROR',
                error: err
            });
        }
    });
}

export function* updateProfileSuccess() {
    yield takeEvery('UPDATE_PROFILE_SUCCESS', function*({ payload }) {});
}

export function* updateProfileError() {
    yield takeEvery('UPDATE_PROFILE_ERROR', function*() {});
}

export default function* rootSaga() {
    yield all([
        fork(getProfileRequest),
        fork(getProfileSuccess),
        fork(getProfileError),
        fork(loginRequest),
        fork(loginSuccess),
        fork(loginError),
        fork(logoutRequest),
        fork(logoutSuccess),
        fork(logoutError),
        fork(registerRequest),
        fork(registerSuccess),
        fork(registerError),
        fork(updateProfileRequest),
        fork(updateProfileSuccess),
        fork(updateProfileError)
    ]);
}
