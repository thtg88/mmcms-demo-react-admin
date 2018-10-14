// actions
const actions = {
    CLEAR_METADATA_PROFILE: 'CLEAR_METADATA_PROFILE',
    GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST',
    GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
    GET_PROFILE_ERROR: 'GET_PROFILE_ERROR',
    LOGGED_OUT: 'LOGGED_OUT',
    LOGIN_ERROR_RESET: 'LOGIN_ERROR_RESET',
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERROR: 'LOGOUT_ERROR',
    REGISTER_ERROR_RESET: 'REGISTER_ERROR_RESET',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_ERROR: 'REGISTER_ERROR',
    UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
    UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
    UPDATE_PROFILE_ERROR: 'UPDATE_PROFILE_ERROR',
};

// action creators
export const clearMetadataProfile = payload => ({
    type: actions.CLEAR_METADATA_PROFILE
});

export const getProfile = payload => ({
    type: actions.GET_PROFILE_REQUEST,
    payload
});

export const login = payload => ({
    type: actions.LOGIN_REQUEST,
    payload
});

export const loggedOut = payload => ({
    type: actions.LOGGED_OUT
});

export const logout = payload => ({
    type: actions.LOGOUT_REQUEST,
    payload
});

export const register = payload => ({
    type: actions.REGISTER_REQUEST,
    payload
});

export const resetLoginError = payload => ({
    type: actions.LOGIN_ERROR_RESET
});

export const resetRegisterError = payload => ({
    type: actions.REGISTER_ERROR_RESET
});

export const updateProfile = payload => ({
    type: actions.UPDATE_PROFILE_REQUEST,
    payload
});

export default actions;
