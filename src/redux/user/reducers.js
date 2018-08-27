const initial_state = {
    current_page: 1,
    error: null,
    fetching_users: false,
    resource: null,
    resources: [],
    total_resources: 0,
    updated: false
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
            const { data, total, current_page } = action.payload;
            return {
                ...state,
                error: null,
                fetching_users: false,
                resources: data,
                total_resources: total,
                current_page: current_page,
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
                updated: false
            };
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                error: null,
                updated: true,
                resource: action.payload.resource,
            };
        case 'UPDATE_USER_ERROR':
            console.log('updatingUser error:', action);
            return {
                ...state,
                error: action.error,
                updated: false
            };
        default:
            return state;
    }
};
export default user;
