import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import {
    getProfile,
    login,
    logout,
    register,
    updateProfile,
} from './helper';

export function* getProfileRequest() {
    yield takeEvery(actions.GET_PROFILE_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(getProfile, data);

            if (result.resource) {
                yield put({
                    type: actions.GET_PROFILE_SUCCESS,
                    payload: result,
                });
            } else {
                yield put({
                    type: actions.GET_PROFILE_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            yield put({
                type: actions.GET_PROFILE_ERROR,
                error: err,
            });
        }
    });
}

export function* loginRequest() {
    yield takeEvery(actions.LOGIN_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(login, data);

            if (result.access_token) {
                yield put({
                    type: actions.LOGIN_SUCCESS,
                    payload: result,
                });
            } else {
                yield put({
                    type: actions.LOGIN_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            yield put({
                type: actions.LOGIN_ERROR,
                error: err,
            });
        }
    });
}

export function* logoutRequest() {
    yield takeEvery(actions.LOGOUT_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            yield call(logout, data);

            yield put({
                type: actions.LOGOUT_SUCCESS,
            });
        } catch(err) {
            yield put({
                type: actions.LOGOUT_SUCCESS,
            });
        }
    });
}

export function* registerRequest() {
    yield takeEvery(actions.REGISTER_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(register, data);

            if (result.access_token) {
                yield put({
                    type: actions.REGISTER_SUCCESS,
                    payload: result,
                });
            } else {
                yield put({
                    type: actions.REGISTER_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            yield put({
                type: actions.REGISTER_ERROR,
                error: err,
            });
        }
    });
}

export function* updateProfileRequest() {
    yield takeEvery(actions.UPDATE_PROFILE_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(updateProfile, data);

            if (result.resource) {
                yield put({
                    type: actions.UPDATE_PROFILE_SUCCESS,
                    payload: result,
                });
            } else {
                yield put({
                    type: actions.UPDATE_PROFILE_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            yield put({
                type: actions.UPDATE_PROFILE_ERROR,
                error: err,
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getProfileRequest),
        fork(loginRequest),
        fork(logoutRequest),
        fork(registerRequest),
        fork(updateProfileRequest),
    ]);
}
