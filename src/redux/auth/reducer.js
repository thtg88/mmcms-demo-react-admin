const initial_state = {
    error: null,
    loading: false,
    token: null,
    user: null
};

const auth = (state = initial_state, action) => {
    switch(action.type) {
        case 'AUTH_RESET_ERROR':
            return {
                ...state,
                error: null
            };
        case 'LOGIN_REQUEST':
            console.log('dispatched', state);
            return {
                ...state,
                error: null,
                loading: true
            };
        case 'LOGIN_SUCCESS':
            // TODO set token
            // TODO set user
            return {
                ...state,
                error: null,
                loading: false
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case 'REGISTER_REQUEST':
            return {
                ...state,
                error: null,
                loading: true
            };
        case 'REGISTER_SUCCESS':
            // TODO set token
            // TODO set user
            return {
                ...state,
                error: null,
                loading: false
            };
        case 'REGISTER_ERROR':
            console.log('dispatched error');
            console.log(action);
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case 'LOGOUT':
            return initial_state;
        default:
            return state;
    }
};
export default auth;
