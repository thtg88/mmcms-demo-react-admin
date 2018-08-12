const initial_state = {
    error: null,
    loading: false,
    token: null,
    user: null
};

const register = (state = initial_state, action) => {
    switch(action.type) {
        case 'REGISTER_RESET_ERROR':
            return {
                ...state,
                error: null
            };
        case 'REGISTER_REQUEST':
            return {
                ...state,
                error: null,
                loading: true
            };
        case 'REGISTER_SUCCESS':
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
        case 'REGISTER_ERROR':
            console.log('dispatched error');
            console.log(action);
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
};
export default register;
