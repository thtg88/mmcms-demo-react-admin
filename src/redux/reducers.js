import reducerRegistry from './reducerRegistry';
import auth from './auth/reducers';
import imageCategories from './imageCategories/reducers';
import images from './images/reducers';
import seoEntries from './seoEntries/reducers';

export const defaultReducers = {
    auth,
    imageCategories,
    images,
    seoEntries,
};

// We only register the initial defaul reducers here,
// Leaving the other ones for async loading

const registerDefaultReducers = () => {
    Object.entries(defaultReducers).forEach(([name, reducer]) => {
        reducerRegistry.register(name, reducer);
    });
};

export default registerDefaultReducers;
