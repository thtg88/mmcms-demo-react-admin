import actions from './actions';

const initial_state = {
    error: null,
    logged_out: false,
    logging_in: false,
    logging_out: false,
    registering: false,
    token: null,
    updated_profile: false,
    user: null,
};

const reducer = (state = initial_state, action) => {
    switch(action.type) {
        case actions.CLEAR_METADATA_PROFILE:
            return {
                ...state,
                error: null,
                logging_in: false,
                logging_out: false,
                registering: false,
                updated_profile: false,
            };
        case actions.GET_PROFILE_REQUEST:
            return {
                ...state,
                error: null,
                user: null,
            };
        case actions.GET_PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
                user: action.payload.resource,
            };
        case actions.GET_PROFILE_ERROR:
            return {
                ...state,
                error: action.error,
                user: null,
            };
        case actions.LOGGED_OUT:
            return {
                ...state,
                logged_out: true,
                token: null,
                user: null,
            };
        case actions.LOGIN_ERROR_RESET:
            return {
                ...state,
                error: null,
            };
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                error: null,
                logged_out: false,
                logging_in: true,
            };
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                error: null,
                logging_in: false,
                token: action.payload,
                user: null,
            };
        case actions.LOGIN_ERROR:
            return {
                ...state,
                error: action.error,
                logging_in: false,
            };
        case actions.LOGOUT_REQUEST:
            return {
                ...state,
                error: null,
                logging_out: true,
            };
        case actions.LOGOUT_SUCCESS:
        case actions.LOGOUT_ERROR:
            return {
                ...state,
                error: null,
                logging_out: false,
                token: null,
                user: null,
            };
        case actions.REGISTER_ERROR_RESET:
            return {
                ...state,
                error: null,
            };
        case actions.REGISTER_REQUEST:
            return {
                ...state,
                error: null,
                logged_out: false,
                registering: true,
            };
        case actions.REGISTER_SUCCESS:
            // Destructure object into user and the rest
            // Which will be the payload
            const { resource, ...token_payload } = action.payload;
            return {
                ...state,
                error: null,
                registering: false,
                token: token_payload,
                user: resource,
            };
        case actions.REGISTER_ERROR:
            return {
                ...state,
                error: action.error,
                registering: false,
            };
        case actions.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                error: null,
                updated_profile: false,
            };
        case actions.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
                updated_profile: true,
                user: action.payload.resource,
            };
        case actions.UPDATE_PROFILE_ERROR:
            return {
                ...state,
                error: action.error,
                updated_profile: false,
            };
        default:
            return state;
    }
};

export default reducer;
