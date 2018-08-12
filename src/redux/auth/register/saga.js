import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { register } from '../helper';

export function* logout() {
    yield takeEvery('LOGOUT', function*() {});
}

export function* registerRequest() {
    yield takeEvery('REGISTER_REQUEST', function*({ payload }) {
        console.log('register taken!', payload);
        const { data } = payload;
        console.log('data', data);
        try {
            const result = yield call(register, data);
            console.log('register result: ', result);
            if (result.access_token) {
                yield put({
                    type: 'REGISTER_SUCCESS',
                    payload: result
                });
            } else {
                yield put({
                    type: 'REGISTER_ERROR',
                    error: result.error || result
                });
            }

        } catch(err) {
            console.log('register error caught: ', err);
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

export default function* rootSaga() {
    yield all([
        fork(registerRequest),
        fork(registerSuccess),
        fork(registerError)
    ]);
}
