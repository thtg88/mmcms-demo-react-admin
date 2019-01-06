import reducerRegistry from './reducerRegistry';
import auth from './auth/reducers';

// We only register the initial defaul reducers here,
// Leaving the other ones for async loading

const registerDefaultReducers = () => {
    reducerRegistry.register('auth', auth);

    // console.log(reducerRegistry.getReducers());
};

export default registerDefaultReducers;
