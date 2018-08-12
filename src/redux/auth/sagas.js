import { all } from 'redux-saga/effects';
import loginSagas from './login/saga';
import registerSagas from './register/saga';

export default function* rootSaga(getState) {
    yield all([
        loginSagas(),
        registerSagas(),
    ]);
}
