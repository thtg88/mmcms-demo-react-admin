const initial_state = {
    current_page: 1,
    error: null,
    fetching_users: false,
    resource: null,
    resources: {
        1: []
    },
    total: 0,
    updated: false
};

const user = (state = initial_state, action) => {
    // console.log('action dispatched', action);
    switch(action.type) {
        case 'GET_PAGINATED_USERS_REQUEST': {
            // console.log('getUsers state', state);
            // console.log('getUsers dispatched', action);
            const { data } = action.payload;
            return {
                ...state,
                error: null,
                fetching_users: true,
                current_page: data.page,
                resources: {
                    ...state.resources,
                    [data.page]: []
                },
                total: 0,
            };
        }
        case 'GET_PAGINATED_USERS_SUCCESS': {
            const { data, total, current_page } = action.payload;
            return {
                ...state,
                current_page: current_page,
                error: null,
                fetching_users: false,
                resources: {
                    ...state.resources,
                    [current_page]: data
                },
                total: total,
            };
        }
        case 'GET_PAGINATED_USERS_ERROR':
            // console.log('getUsers error:', action);
            return {
                ...state,
                error: action.error,
                fetching_users: false,
                total: 0
            };
        case 'CHANGE_PAGE_USERS':
            return {
                ...state,
                current_page: action.payload.data.page
            };
        case 'CLEAR_METADATA_USERS':
            // console.log(action.type);
            return {
                ...state,
                error: null,
                current_page: 1,
                fetching_users: false
            };
        case 'GET_USER_REQUEST':
            console.log('getUser dispatched');
            return {
                ...state,
                error: null
            };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                error: null,
                resource: action.payload.resource,
            };
        case 'GET_USER_ERROR':
            console.log('getUser error:', action);
            return {
                ...state,
                error: action.error
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
