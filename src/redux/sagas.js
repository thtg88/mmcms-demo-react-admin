import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import userSagas from './user/sagas';
import roleSagas from './role/sagas';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        roleSagas(),
        userSagas(),
    ]);
}
