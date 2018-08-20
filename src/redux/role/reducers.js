const initial_state = {
    error: null,
    fetching_roles: false,
    updating: false,
    updated: false,
    resources: [],
    total_resources: 0,
    resource: null,
    current_page: 1,
};

const role = (state = initial_state, action) => {
    // console.log('action dispatched', action);
    switch(action.type) {
        case 'GET_PAGINATED_ROLES_REQUEST':
            console.log('getPaginatedRoles dispatched');
            return {
                ...state,
                error: null,
                fetching_roles: true,
                resources: [],
            };
        case 'GET_PAGINATED_ROLES_SUCCESS':
            const { data, total, current_page } = action.payload;
            return {
                ...state,
                error: null,
                fetching_roles: false,
                resources: data,
                total_resources: total,
                current_page: current_page,
            };
        case 'GET_PAGINATED_ROLES_ERROR':
            console.log('getPaginatedRoles error:', action);
            return {
                ...state,
                error: action.error,
                fetching_roles: false,
                resources: [],
            };
        case 'UPDATE_ROLE_REQUEST':
            console.log('updatingRole dispatched');
            return {
                ...state,
                error: null,
                updated: false,
                updating: true,
            };
        case 'UPDATE_ROLE_SUCCESS':
            return {
                ...state,
                error: null,
                updating: false,
                updated: true,
                resource: action.payload.resource,
            };
        case 'UPDATE_ROLE_ERROR':
            console.log('updatingRole error:', action);
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
export default role;
