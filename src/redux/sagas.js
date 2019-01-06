import sagaRegistry from './sagaRegistry';
import authSagas from './auth/sagas';

export const registerDefaultSagas = () => {
    sagaRegistry.register('auth', authSagas);
};
