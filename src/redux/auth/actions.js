import createActionName from '../createActionName';

export const reducerName = 'auth';

export const CLEAR_METADATA_PROFILE = createActionName(reducerName, 'CLEAR_METADATA_PROFILE');
export const GET_PROFILE_REQUEST = createActionName(reducerName, 'GET_PROFILE_REQUEST');
export const GET_PROFILE_SUCCESS = createActionName(reducerName, 'GET_PROFILE_SUCCESS');
export const GET_PROFILE_ERROR = createActionName(reducerName, 'GET_PROFILE_ERROR');
export const LOGGED_OUT = createActionName(reducerName, 'LOGGED_OUT');
export const LOGIN_ERROR_RESET = createActionName(reducerName, 'LOGIN_ERROR_RESET');
export const LOGIN_REQUEST = createActionName(reducerName, 'LOGIN_REQUEST');
export const LOGIN_SUCCESS = createActionName(reducerName, 'LOGIN_SUCCESS');
export const LOGIN_ERROR = createActionName(reducerName, 'LOGIN_ERROR');
export const LOGOUT_REQUEST = createActionName(reducerName, 'LOGOUT_REQUEST');
export const LOGOUT_SUCCESS = createActionName(reducerName, 'LOGOUT_SUCCESS');
export const LOGOUT_ERROR = createActionName(reducerName, 'LOGOUT_ERROR');
export const REFRESH_TOKEN_REQUEST = createActionName(reducerName, 'REFRESH_TOKEN_REQUEST');
export const REFRESH_TOKEN_SUCCESS = createActionName(reducerName, 'REFRESH_TOKEN_SUCCESS');
export const REFRESH_TOKEN_ERROR = createActionName(reducerName, 'REFRESH_TOKEN_ERROR');
export const REGISTER_ERROR_RESET = createActionName(reducerName, 'REGISTER_ERROR_RESET');
export const REGISTER_REQUEST = createActionName(reducerName, 'REGISTER_REQUEST');
export const REGISTER_SUCCESS = createActionName(reducerName, 'REGISTER_SUCCESS');
export const REGISTER_ERROR = createActionName(reducerName, 'REGISTER_ERROR');
export const UPDATE_PROFILE_REQUEST = createActionName(reducerName, 'UPDATE_PROFILE_REQUEST');
export const UPDATE_PROFILE_SUCCESS = createActionName(reducerName, 'UPDATE_PROFILE_SUCCESS');
export const UPDATE_PROFILE_ERROR = createActionName(reducerName, 'UPDATE_PROFILE_ERROR');

// actions
const actions = {
    CLEAR_METADATA_PROFILE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR,
    LOGGED_OUT,
    LOGIN_ERROR_RESET,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR,
    REGISTER_ERROR_RESET,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
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

export const refreshToken = payload => ({
    type: actions.REFRESH_TOKEN_REQUEST,
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
