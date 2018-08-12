const initial_state = {
    error: null,
    loading: false,
    token: null,
    user: null
};

const login = (state = initial_state, action) => {
    switch(action.type) {
        case 'LOGIN_RESET_ERROR':
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
        case 'LOGOUT':
            return initial_state;
        default:
            return state;
    }
};
export default login;
