import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';
import { loadState, sanitizeState, saveState } from './localStorage';
import rootReducers from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
    const persistedState = loadState();
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducers,
        persistedState,
        applyMiddleware(sagaMiddleware)
    );

    store.subscribe(throttle(() => {
        saveState(sanitizeState(store.getState()));
    }, 1000));

    console.log('initial state: ', store.getState());

    sagaMiddleware.run(rootSaga);

    return store;
}
export default configureStore;
