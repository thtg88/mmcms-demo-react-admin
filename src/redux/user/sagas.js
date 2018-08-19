import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { getPaginatedUsers, updateUser } from './helper';

export function* getPaginatedUsersRequest() {
    yield takeEvery('GET_PAGINATED_USERS_REQUEST', function*({ payload }) {
        console.log('getPaginatedUsers taken!', payload);
        const { data } = payload;
        console.log('data', data);
        try {
            const result = yield call(getPaginatedUsers, data);
            console.log('getPaginatedUsers result: ', result);
            if (result.resources) {
                yield put({
                    type: 'GET_PAGINATED_USERS_SUCCESS',
                    payload: result
                });
            } else {
                yield put({
                    type: 'GET_PAGINATED_USERS_ERROR',
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            console.log('getPaginatedUsers error caught: ', err);
            yield put({
                type: 'GET_PAGINATED_USERS_ERROR',
                error: err
            });
        }
    });
}

export function* getPaginatedUsersSuccess() {
    yield takeEvery('GET_PAGINATED_USERS_SUCCESS', function*({ payload }) {});
}

export function* getPaginatedUsersError() {
    yield takeEvery('GET_PAGINATED_USERS_ERROR', function*() {});
}

export function* updateUserRequest() {
    yield takeEvery('UPDATE_USER_REQUEST', function*({ payload }) {
        console.log('updateUser taken!', payload);
        const { data } = payload;
        console.log('data', data);
        try {
            const result = yield call(updateUser, data);
            console.log('updateUser result: ', result);
            if (result.resource) {
                yield put({
                    type: 'UPDATE_USER_SUCCESS',
                    payload: result
                });
            } else {
                yield put({
                    type: 'UPDATE_USER_ERROR',
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            console.log('updateUser error caught: ', err);
            yield put({
                type: 'UPDATE_USER_ERROR',
                error: err
            });
        }
    });
}

export function* updateUserSuccess() {
    yield takeEvery('UPDATE_USER_SUCCESS', function*({ payload }) {});
}

export function* updateUserError() {
    yield takeEvery('UPDATE_USER_ERROR', function*() {});
}

export default function* rootSaga() {
    yield all([
        fork(getPaginatedUsersRequest),
        fork(getPaginatedUsersSuccess),
        fork(getPaginatedUsersError),
        fork(updateUserRequest),
        fork(updateUserSuccess),
        fork(updateUserError)
    ]);
}
