import actions from './actions';
import updatePaginatedResourcesFromResource from '../../helpers/updatePaginatedResourcesFromResource';

const initial_state = {
    created: false,
    current_page: 1,
    destroyed: false,
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
        case actions.CHANGE_PAGE_USERS:
            return {
                ...state,
                current_page: action.payload.data.page
            };
        case actions.CLEAR_METADATA_USERS: {
            const { data } = action.payload;
            // console.log(action.type);
            return {
                ...state,
                error: null,
                current_page: 1,
                destroyed: false,
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
        case actions.CLEAR_METADATA_USER_EDIT:
            return {
                ...state,
                error: null,
                updated: false,
                created: false,
                resource: null
            };
        case actions.CLEAR_METADATA_USER_CREATE:
            return {
                ...state,
                error: null,
                // created: false,
                resource: null
            };
        case actions.CREATE_USER_REQUEST:
            // console.log('creatingUser dispatched');
            return {
                ...state,
                error: null,
                created: false
            };
        case actions.CREATE_USER_SUCCESS:
            return {
                ...state,
                error: null,
                created: true,
                resource: action.payload.resource,
            };
        case actions.CREATE_USER_ERROR:
            console.log('createUser error:', action);
            return {
                ...state,
                error: action.error,
                created: false
            };
        case actions.DESTROY_USER_REQUEST:
            // console.log('destroyUser dispatched');
            return {
                ...state,
                error: null,
                destroyed: false
            };
        case actions.DESTROY_USER_SUCCESS:
            return {
                ...state,
                error: null,
                destroyed: true,
                // resource: action.payload.resource,
            };
        case actions.DESTROY_USER_ERROR:
            // console.log('destroyUser error:', action);
            return {
                ...state,
                error: action.error,
                destroyed: false
            };
        case actions.GET_PAGINATED_USERS_REQUEST: {
            // console.log('getUsers state', state);
            // console.log('getUsers dispatched', action);
            const { data } = action.payload;
            return {
                ...state,
                error: null,
                fetching_resources: true,
                current_page: data.page,
                // If searching, reset all pages
                resources: (
                        typeof data.q !== 'undefined'
                        && data.q !== ''
                    )
                    ? {
                        1: []
                    }
                    // Otherwise reset page I'm fetching
                    : {
                        ...state.resources,
                        [data.page]: []
                    },
                total: 0,
            };
        }
        case actions.GET_PAGINATED_USERS_SUCCESS: {
            const { data, total, current_page } = action.payload;
            return {
                ...state,
                current_page: current_page,
                error: null,
                fetching_resources: false,
                resources: {
                    ...state.resources,
                    [current_page]: data,
                },
                total: total,
            };
        }
        case actions.GET_PAGINATED_USERS_ERROR:
            // console.log('getUsers error:', action);
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
                total: 0
            };
        case actions.GET_USER_REQUEST:
            // console.log('getUser dispatched');
            return {
                ...state,
                error: null
            };
        case actions.GET_USER_SUCCESS:
            return {
                ...state,
                error: null,
                resource: action.payload.resource,
            };
        case actions.GET_USER_ERROR:
            // console.log('getUser error:', action);
            return {
                ...state,
                error: action.error
            };
        case actions.UPDATE_USER_REQUEST:
            // console.log('updateUser dispatched');
            return {
                ...state,
                created: false,
                error: null,
                updated: false
            };
        case actions.UPDATE_USER_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                error: null,
                updated: true,
                resource: action.payload.resource,
                resources: updatePaginatedResourcesFromResource(state.resources, resource)
            };
        }
        case actions.UPDATE_USER_ERROR:
            // console.log('updateUser error:', action);
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
