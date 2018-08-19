const initial_state = {
    error: null,
    fetching_users: false,
    updating: false,
    updated: false,
    resources: [],
    resource: null
};

const user = (state = initial_state, action) => {
    // console.log('action dispatched', action);
    switch(action.type) {
        case 'GET_PAGINATED_USERS_REQUEST':
            console.log('getUsers dispatched');
            return {
                ...state,
                error: null,
                fetching_users: true,
                resources: [],
            };
        case 'GET_PAGINATED_USERS_SUCCESS':
            return {
                ...state,
                error: null,
                fetching_users: false,
                resources: action.payload.resources,
            };
        case 'GET_PAGINATED_USERS_ERROR':
            console.log('getUsers error:', action);
            return {
                ...state,
                error: action.error,
                fetching_users: false,
                resources: [],
            };
        case 'UPDATE_USER_REQUEST':
            console.log('updatingUser dispatched');
            return {
                ...state,
                error: null,
                updated: false,
                updating: true,
            };
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                error: null,
                updating: false,
                updated: true,
                resource: action.payload.resource,
            };
        case 'UPDATE_USER_ERROR':
            console.log('updatingUser error:', action);
            return {
                ...state,
                error: action.error,
                updated: false,
                updating: false,
            };
        default:
            return state;
    }
};
export default user;
