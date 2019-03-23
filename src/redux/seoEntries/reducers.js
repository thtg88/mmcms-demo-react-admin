import actions from './actions';
import { updatePaginatedResourcesFromResource } from '../../helpers/paginatedResources';

const initial_state = {
    created: false,
    destroyed: false,
    error: null,
    fetching_resources: false,
    resource: null,
    updated: false
};

const reducer = (state = initial_state, action) => {
    // console.log('action dispatched', action);

    switch(action.type) {
        case actions.CLEAR_METADATA_RESOURCE_CREATE:
            return {
                ...state,
                error: null,
                // created: false,
                resource: null,
            };
        case actions.CLEAR_METADATA_RESOURCE_EDIT:
            return {
                ...state,
                created: false,
                error: null,
                resource: null,
                updated: false,
            };
        case actions.CREATE_RESOURCE_REQUEST: {
            return {
                ...state,
                error: null,
                created: false,
            };
        }
        case actions.CREATE_RESOURCE_SUCCESS:
            return {
                ...state,
                error: null,
                created: true,
                resource: action.payload.resource,
            };
        case actions.CREATE_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                created: false,
            };
        case actions.DESTROY_RESOURCE_REQUEST:
            return {
                ...state,
                error: null,
                destroyed: false,
            };
        case actions.DESTROY_RESOURCE_SUCCESS:
            return {
                ...state,
                error: null,
                destroyed: true,
                // resource: action.payload.resource,
            };
        case actions.DESTROY_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                destroyed: false,
            };
        case actions.FIND_RESOURCE_REQUEST:
            return {
                ...state,
                error: null,
            };
        case actions.FIND_RESOURCE_SUCCESS:
            return {
                ...state,
                error: null,
                resource: action.payload.resource,
            };
        case actions.FIND_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case actions.UPDATE_RESOURCE_REQUEST:
            return {
                ...state,
                created: false,
                error: null,
                updated: false,
            };
        case actions.UPDATE_RESOURCE_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                error: null,
                updated: true,
                resource: resource,
                paginated_resources: updatePaginatedResourcesFromResource(state.paginated_resources, resource),
            };
        }
        case actions.UPDATE_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                updated: false,
            };
        default:
            return state;
    }
};

export default reducer;
