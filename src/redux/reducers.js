import reducerRegistry from './reducerRegistry';
import auth from './auth/reducers';

export const defaultReducers = {
    auth,
};

// We only register the initial defaul reducers here,
// Leaving the other ones for async loading

const registerDefaultReducers = () => {
    Object.entries(defaultReducers).forEach(([name, reducer]) => {
        reducerRegistry.register(name, reducer);
    });
};

export default registerDefaultReducers;
