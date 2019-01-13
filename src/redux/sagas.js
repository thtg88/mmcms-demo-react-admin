import sagaRegistry from './sagaRegistry';
import auth from './auth/sagas';

export const defaultSagas = {
    auth,
};

export const registerDefaultSagas = () => {
    Object.entries(defaultSagas).forEach(([name, saga]) => {
        sagaRegistry.register(name, saga);
    })
};
