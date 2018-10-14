// actions
const actions = {
    CHANGE_PAGE_ROLES: 'CHANGE_PAGE_ROLES',
    CLEAR_METADATA_ROLES: 'CLEAR_METADATA_ROLES',
    CLEAR_METADATA_ROLE_EDIT: 'CLEAR_METADATA_ROLE_EDIT',
    CLEAR_METADATA_ROLE_CREATE: 'CLEAR_METADATA_ROLE_CREATE',
    CREATE_ROLE_REQUEST: 'CREATE_ROLE_REQUEST',
    CREATE_ROLE_SUCCESS: 'CREATE_ROLE_SUCCESS',
    CREATE_ROLE_ERROR: 'CREATE_ROLE_ERROR',
    DESTROY_ROLE_REQUEST: 'DESTROY_ROLE_REQUEST',
    DESTROY_ROLE_SUCCESS: 'DESTROY_ROLE_SUCCESS',
    DESTROY_ROLE_ERROR: 'DESTROY_ROLE_ERROR',
    GET_PAGINATED_ROLES_REQUEST: 'GET_PAGINATED_ROLES_REQUEST',
    GET_PAGINATED_ROLES_SUCCESS: 'GET_PAGINATED_ROLES_SUCCESS',
    GET_PAGINATED_ROLES_ERROR: 'GET_PAGINATED_ROLES_ERROR',
    GET_ROLE_REQUEST: 'GET_ROLE_REQUEST',
    GET_ROLE_SUCCESS: 'GET_ROLE_SUCCESS',
    GET_ROLE_ERROR: 'GET_ROLE_ERROR',
    UPDATE_ROLE_REQUEST: 'UPDATE_ROLE_REQUEST',
    UPDATE_ROLE_SUCCESS: 'UPDATE_ROLE_SUCCESS',
    UPDATE_ROLE_ERROR: 'UPDATE_ROLE_ERROR',
};

// action creators
export const changePageResources = payload => ({
    type: actions.CHANGE_PAGE_ROLES
});

export const clearMetadataResourceCreate = payload => ({
    type: actions.CLEAR_METADATA_ROLE_CREATE
});

export const clearMetadataResourceEdit = payload => ({
    type: actions.CLEAR_METADATA_ROLE_EDIT
});

export const clearMetadataResources = payload => ({
    type: actions.CLEAR_METADATA_ROLES,
    payload
});

export const createResource = payload => ({
    type: actions.CREATE_ROLE_REQUEST,
    payload
});

export const destroyResource = payload => ({
    type: actions.DESTROY_ROLE_REQUEST,
    payload
});

export const getPaginatedResources = payload => ({
    type: actions.GET_PAGINATED_ROLES_REQUEST,
    payload
});

export const getResource = payload => ({
    type: actions.GET_ROLE_REQUEST,
    payload
});

export const updateResource = payload => ({
    type: actions.UPDATE_ROLE_REQUEST,
    payload
});

export default actions;
