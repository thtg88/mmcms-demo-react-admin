import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import rootReducers from './reducers';
import rootSaga from './sagas';

export const configureStore = () => {
    const { REACT_APP_STATE_DRIVER } = process.env;
    const sagaMiddleware = createSagaMiddleware();
    let store;

    if(REACT_APP_STATE_DRIVER === "localStorage") {
        const persistedState = loadState();
        store = createStore(
            rootReducers,
            persistedState,
            applyMiddleware(sagaMiddleware)
        );

        store.subscribe(throttle(() => {
            saveState(store.getState());
        }, 1000));

    } else {
        store = createStore(
            rootReducers,
            applyMiddleware(sagaMiddleware)
        );
    }

    console.log('initial state: ', store.getState());

    sagaMiddleware.run(rootSaga);

    return store;
}

const store = configureStore();

export default store;
