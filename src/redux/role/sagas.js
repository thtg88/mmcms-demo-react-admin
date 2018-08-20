import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { getPaginatedRoles, updateRole } from './helper';

export function* getPaginatedRolesRequest() {
    yield takeEvery('GET_PAGINATED_ROLES_REQUEST', function*({ payload }) {
        console.log('getPaginatedRoles taken!', payload);
        const { data } = payload;
        console.log('data', data);
        try {
            const result = yield call(getPaginatedRoles, data);
            console.log('getPaginatedRoles result: ', result);
            if (result.data) {
                yield put({
                    type: 'GET_PAGINATED_ROLES_SUCCESS',
                    payload: result
                });
            } else {
                yield put({
                    type: 'GET_PAGINATED_ROLES_ERROR',
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            console.log('getPaginatedRoles error caught: ', err);
            yield put({
                type: 'GET_PAGINATED_ROLES_ERROR',
                error: err
            });
        }
    });
}

export function* getPaginatedRolesSuccess() {
    yield takeEvery('GET_PAGINATED_ROLES_SUCCESS', function*({ payload }) {});
}

export function* getPaginatedRolesError() {
    yield takeEvery('GET_PAGINATED_ROLES_ERROR', function*() {});
}

export function* updateRoleRequest() {
    yield takeEvery('UPDATE_ROLE_REQUEST', function*({ payload }) {
        console.log('updateRole taken!', payload);
        const { data } = payload;
        console.log('data', data);
        try {
            const result = yield call(updateRole, data);
            console.log('updateRole result: ', result);
            if (result.resource) {
                yield put({
                    type: 'UPDATE_ROLE_SUCCESS',
                    payload: result
                });
            } else {
                yield put({
                    type: 'UPDATE_ROLE_ERROR',
                    error: result.error || result.errors || result
                });
            }

        } catch(err) {
            console.log('updateRole error caught: ', err);
            yield put({
                type: 'UPDATE_ROLE_ERROR',
                error: err
            });
        }
    });
}

export function* updateRoleSuccess() {
    yield takeEvery('UPDATE_ROLE_SUCCESS', function*({ payload }) {});
}

export function* updateRoleError() {
    yield takeEvery('UPDATE_ROLE_ERROR', function*() {});
}

export default function* rootSaga() {
    yield all([
        fork(getPaginatedRolesRequest),
        fork(getPaginatedRolesSuccess),
        fork(getPaginatedRolesError),
        fork(updateRoleRequest),
        fork(updateRoleSuccess),
        fork(updateRoleError)
    ]);
}
