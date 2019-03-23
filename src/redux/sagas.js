import sagaRegistry from './sagaRegistry';
import auth from './auth/sagas';
import imageCategories from './imageCategories/sagas';
import images from './images/sagas';
import seoEntries from './seoEntries/sagas';

export const defaultSagas = {
    auth,
    imageCategories,
    images,
    seoEntries,
};

export const registerDefaultSagas = () => {
    Object.entries(defaultSagas).forEach(([name, saga]) => {
        sagaRegistry.register(name, saga);
    })
};
