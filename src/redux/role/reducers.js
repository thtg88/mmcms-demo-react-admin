import updatePaginatedResourcesFromResource from '../../helpers/updatePaginatedResourcesFromResource';

const initial_state = {
    created: false,
    destroyed: false,
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
        case 'CHANGE_PAGE_ROLES':
            return {
                ...state,
                current_page: action.payload.data.page
            };
        case 'CLEAR_METADATA_ROLES': {
            const { data } = action.payload;
            // console.log(action.type);
            return {
                ...state,
                current_page: 1,
                destroyed: false,
                error: null,
                fetching_resources: false,
                resources: (
                        data.query !== ''
                        && data.query !== null
                        && typeof data.query !== 'undefined'
                    )
                    // If I've searched before,
                    // Clear the resources so on next reload
                    // A re-fetch will be needed
                    ? {
                        1: []
                    }
                    : {
                        ...state.resources
                    }
            };
        }
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
        case 'CREATE_ROLE_REQUEST':
            // console.log('creatingRole dispatched');
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
            // console.log('creatingRole error:', action);
            return {
                ...state,
                error: action.error,
                created: false
            };
        case 'DESTROY_ROLE_REQUEST':
            // console.log('deletingRole dispatched');
            return {
                ...state,
                error: null,
                destroyed: false
            };
        case 'DESTROY_ROLE_SUCCESS':
            return {
                ...state,
                error: null,
                destroyed: true,
                // resource: action.payload.resource,
            };
        case 'DESTROY_ROLE_ERROR':
            // console.log('deletingRole error:', action);
            return {
                ...state,
                error: action.error,
                destroyed: false
            };
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
        case 'GET_ROLE_REQUEST':
            // console.log('getRole dispatched');
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
            // console.log('getRole error:', action);
            return {
                ...state,
                error: action.error
            };
        case 'UPDATE_ROLE_REQUEST':
            // console.log('updatingRole dispatched');
            return {
                ...state,
                created: false,
                error: null,
                updated: false
            };
        case 'UPDATE_ROLE_SUCCESS': {
            const { resource } = action.payload;
            return {
                ...state,
                error: null,
                updated: true,
                resource: resource,
                resources: updatePaginatedResourcesFromResource(state.resources, resource)
            };
        }
        case 'UPDATE_ROLE_ERROR':
            // console.log('updatingRole error:', action);
            return {
                ...state,
                error: action.error,
                updated: false
            };
        default:
            return state;
    }
};

export default role;
