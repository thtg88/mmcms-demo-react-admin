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

const role = (state = initial_state, action) => {
    // console.log('action dispatched', action);
    switch(action.type) {
        case 'GET_PAGINATED_ROLES_REQUEST': {
            // console.log('getRoles state', state);
            // console.log('getRoles dispatched', action);
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
        case 'GET_PAGINATED_ROLES_SUCCESS': {
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
        case 'GET_PAGINATED_ROLES_ERROR':
            // console.log('getRoles error:', action);
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
                total: 0
            };
        case 'CHANGE_PAGE_ROLES':
            return {
                ...state,
                current_page: action.payload.data.page
            };
        case 'CLEAR_METADATA_ROLES':
            // console.log(action.type);
            return {
                ...state,
                error: null,
                current_page: 1,
                fetching_resources: false
            };
        case 'GET_ROLE_REQUEST':
            console.log('getRole dispatched');
            return {
                ...state,
                error: null
            };
        case 'GET_ROLE_SUCCESS':
            return {
                ...state,
                error: null,
                resource: action.payload.resource,
            };
        case 'GET_ROLE_ERROR':
            console.log('getRole error:', action);
            return {
                ...state,
                error: action.error
            };
        case 'UPDATE_ROLE_REQUEST':
            console.log('updatingRole dispatched');
            return {
                ...state,
                created: false,
                error: null,
                updated: false
            };
        case 'UPDATE_ROLE_SUCCESS':
            return {
                ...state,
                error: null,
                updated: true,
                resource: action.payload.resource,
            };
        case 'UPDATE_ROLE_ERROR':
            console.log('updatingRole error:', action);
            return {
                ...state,
                error: action.error,
                updated: false
            };
        case 'CREATE_ROLE_REQUEST':
            console.log('creatingRole dispatched');
            return {
                ...state,
                error: null,
                created: false
            };
        case 'CREATE_ROLE_SUCCESS':
            return {
                ...state,
                error: null,
                created: true,
                resource: action.payload.resource,
            };
        case 'CREATE_ROLE_ERROR':
            console.log('creatingRole error:', action);
            return {
                ...state,
                error: action.error,
                created: false
            };
        case 'CLEAR_METADATA_ROLE_EDIT':
            return {
                ...state,
                error: null,
                updated: false,
                created: false,
                resource: null
            };
        case 'CLEAR_METADATA_ROLE_CREATE':
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

export default role;
