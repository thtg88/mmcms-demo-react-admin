import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import rootSaga from './sagas';
import auth from './auth/reducer';

const configureStore = () => {
    const persistedState = loadState();
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers({
            auth
        }),
        persistedState,
        applyMiddleware(sagaMiddleware)
    );

    store.subscribe(throttle(() => {
        const state = store.getState();
        const cleanedState = {
            auth: {
                token: state.auth.token,
                user: state.auth.user
            }
        }
        saveState(cleanedState);
    }, 1000));

    console.log('initial state: ', store.getState());

    sagaMiddleware.run(rootSaga);

    return store;
}
export default configureStore;
