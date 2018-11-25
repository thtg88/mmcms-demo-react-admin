import reducerRegistry from './reducerRegistry';
import auth from './auth/reducers';

// We only register the initial defaul reducers here,
// Leaving the other ones for async loading

export const defaultReducers = {
    auth,
};

const registerDefaultReducers = () => {
    Object.entries(defaultReducers).forEach(([name, reducer], idx) => {
        reducerRegistry.register(name, reducer);
    });

    // console.log(reducerRegistry.getReducers());
};


export default registerDefaultReducers;
