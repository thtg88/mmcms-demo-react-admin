const initial_state = {
    created: false,
    current_page: 1,
    error: null,
    fetching_resources: false,
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
                fetching_resources: true,
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
                fetching_resources: false,
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
                fetching_resources: false,
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
                fetching_resources: false
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
                created: false,
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
        case 'CREATE_USER_REQUEST':
            console.log('creatingUser dispatched');
            return {
                ...state,
                error: null,
                created: false
            };
        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                error: null,
                created: true,
                resource: action.payload.resource,
            };
        case 'CREATE_USER_ERROR':
            console.log('creatingUser error:', action);
            return {
                ...state,
                error: action.error,
                created: false
            };
        case 'CLEAR_METADATA_USER_EDIT':
            return {
                ...state,
                error: null,
                updated: false,
                created: false,
                resource: null
            };
        case 'CLEAR_METADATA_USER_CREATE':
            return {
                ...state,
                error: null,
                // created: false,
                resource: null
            };
        default:
            return state;
    }
};

export default user;
