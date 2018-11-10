import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import rolesSagas from './roles/sagas';
import usersSagas from './users/sagas';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        rolesSagas(),
        usersSagas(),
    ]);
}
