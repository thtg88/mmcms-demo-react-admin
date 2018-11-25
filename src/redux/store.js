import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import reducerRegistry from './reducerRegistry';
import registerDefaultReducers from './reducers';
import rootSaga from './sagas';

export const configureStore = () => {
    const { REACT_APP_STATE_DRIVER } = process.env;
    const sagaMiddleware = createSagaMiddleware();
    let store;
    let persistedState;

    if(REACT_APP_STATE_DRIVER === "localStorage") {
        persistedState = loadState();
    }

    registerDefaultReducers();

    if(persistedState) {
        // We register additional reducers
        // in case they are needed from preloaded state
        Object.entries(persistedState).forEach(([name, reducer]) => {
            reducerRegistry.register(name, reducer);
        });
    }

    const reducers = reducerRegistry.getReducers();

    console.log(reducers);

    const rootReducers = combineReducers(reducers);

    if(persistedState) {
        store = createStore(
            rootReducers,
            persistedState,
            composeWithDevTools(
                applyMiddleware(sagaMiddleware)
            )
        );
    } else {
        store = createStore(
            rootReducers,
            composeWithDevTools(
                applyMiddleware(sagaMiddleware)
            )
        );
    }

    if(REACT_APP_STATE_DRIVER === "localStorage") {
        store.subscribe(throttle(() => {
            saveState(store.getState());
        }, 1000));
    }

    // We set an event listener for the reducer registry
    // So that whenever a new reducer gets added
    // We replace the reducers with the new ones
    reducerRegistry.setChangeListener((reducers) => {
        // console.log(reducers);
        store.replaceReducer(combineReducers(reducers));
    });

    console.log('initial state: ', store.getState());

    sagaMiddleware.run(rootSaga);

    return store;
}

const store = configureStore();

export default store;
