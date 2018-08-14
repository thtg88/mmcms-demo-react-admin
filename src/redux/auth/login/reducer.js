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
            // Destructure object into user and the rest
            // Which will be the payload
            const { resource, ...token_payload } = action.payload;
            return {
                ...state,
                error: null,
                loading: false,
                user: resource,
                token: token_payload,
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case 'LOGOUT_REQUEST':
            console.log(action.type+' taken');
            return {
                ...state,
                error: null,
                loading: true
            };
        case 'LOGOUT_SUCCESS':
        case 'LOGOUT_ERROR':
            console.log(action.type+' taken');
            return {
                ...state,
                error: null,
                loading: false,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};
export default login;
