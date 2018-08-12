import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { login } from '../helper';

export function* loginRequest() {
    yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
        // console.log('login taken!', payload);
        const { data } = payload;
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
                    error: result.error || result
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

export function* logout() {
    yield takeEvery('LOGOUT', function*() {});
}

export default function* rootSaga() {
    yield all([
        fork(loginRequest),
        fork(loginSuccess),
        fork(loginError),
        fork(logout)
    ]);
}
