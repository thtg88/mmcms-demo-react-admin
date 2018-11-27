import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import {
    getProfile,
    login,
    logout,
    refreshToken,
    register,
    updateProfile,
} from './helper';

export function* getProfileRequest() {
    yield takeEvery(actions.GET_PROFILE_REQUEST, function*({ payload }) {
        const { data } = payload;

        // console.log('getProfile taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(getProfile, data);
            // console.log('getProfile result: ', result);
            if (result.resource) {
                yield put({
                    type: actions.GET_PROFILE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.GET_PROFILE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('getProfile error caught: ', err);
            yield put({
                type: actions.GET_PROFILE_ERROR,
                error: err
            });
        }
    });
}

export function* getProfileSuccess() {
    yield takeEvery(actions.GET_PROFILE_SUCCESS, function*({ payload }) {});
}

export function* getProfileError() {
    yield takeEvery(actions.GET_PROFILE_ERROR, function*() {});
}

export function* loginRequest() {
    yield takeEvery(actions.LOGIN_REQUEST, function*({ payload }) {
        const { data } = payload;

        // console.log('login taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(login, data);
            // console.log('login result: ', result);
            if (result.access_token) {
                yield put({
                    type: actions.LOGIN_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.LOGIN_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('login error caught: ', err);
            yield put({
                type: actions.LOGIN_ERROR,
                error: err
            });
        }
    });
}

export function* loginSuccess() {
    yield takeEvery(actions.LOGIN_SUCCESS, function*({ payload }) {});
}

export function* loginError() {
    yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logoutRequest() {
    yield takeEvery(actions.LOGOUT_REQUEST, function*({ payload }) {
        const { data } = payload;

        // console.log('logout taken!', payload);
        // console.log('data', data);

        try {
            yield call(logout, data);
            // console.log('logout result: ', result);
            yield put({
                type: actions.LOGOUT_SUCCESS,
            });

        } catch(err) {
            // console.log(err);
            yield put({
                type: actions.LOGOUT_SUCCESS,
            });
        }

    });
}

export function* logoutSuccess() {
    yield takeEvery(actions.LOGOUT_SUCCESS, function*({ payload }) {});
}

export function* logoutError() {
    yield takeEvery(actions.LOGOUT_ERROR, function*() {});
}

export function* refreshTokenRequest() {
    yield takeEvery(actions.REFRESH_TOKEN_REQUEST, function*({ payload }) {
        const { data } = payload;

        // console.log('refreshToken taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(refreshToken, data);

            // console.log('refreshToken result: ', result);

            if (result.access_token) {
                yield put({
                    type: actions.REFRESH_TOKEN_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.REFRESH_TOKEN_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('refreshToken error caught: ', err);
            yield put({
                type: actions.REFRESH_TOKEN_ERROR,
                error: err
            });
        }
    });
}

export function* refreshTokenSuccess() {
    yield takeEvery(actions.REFRESH_TOKEN_SUCCESS, function*({ payload }) {});
}

export function* refreshTokenError() {
    yield takeEvery(actions.REFRESH_TOKEN_ERROR, function*() {});
}

export function* registerRequest() {
    yield takeEvery(actions.REGISTER_REQUEST, function*({ payload }) {
        const { data } = payload;

        // console.log('register taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(register, data);

            // console.log('register result: ', result);

            if (result.access_token) {
                yield put({
                    type: actions.REGISTER_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.REGISTER_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('register error caught: ', err);
            yield put({
                type: actions.REGISTER_ERROR,
                error: err
            });
        }
    });
}

export function* registerSuccess() {
    yield takeEvery(actions.REGISTER_SUCCESS, function*({ payload }) {});
}

export function* registerError() {
    yield takeEvery(actions.REGISTER_ERROR, function*() {});
}

export function* updateProfileRequest() {
    yield takeEvery(actions.UPDATE_PROFILE_REQUEST, function*({ payload }) {
        const { data } = payload;

        // console.log('updateProfile taken!', payload);
        // console.log('data', data);

        try {
            const result = yield call(updateProfile, data);

            // console.log('updateProfile result: ', result);

            if (result.resource) {
                yield put({
                    type: actions.UPDATE_PROFILE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.UPDATE_PROFILE_ERROR,
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            // console.log('updateProfile error caught: ', err);
            yield put({
                type: actions.UPDATE_PROFILE_ERROR,
                error: err
            });
        }
    });
}

export function* updateProfileSuccess() {
    yield takeEvery(actions.UPDATE_PROFILE_SUCCESS, function*({ payload }) {});
}

export function* updateProfileError() {
    yield takeEvery(actions.UPDATE_PROFILE_ERROR, function*() {});
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
        fork(refreshTokenRequest),
        fork(refreshTokenSuccess),
        fork(refreshTokenError),
        fork(registerRequest),
        fork(registerSuccess),
        fork(registerError),
        fork(updateProfileRequest),
        fork(updateProfileSuccess),
        fork(updateProfileError)
    ]);
}
