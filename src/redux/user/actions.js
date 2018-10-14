// actions
const actions = {
    CHANGE_PAGE_USERS: 'CHANGE_PAGE_USERS',
    CLEAR_METADATA_USERS: 'CLEAR_METADATA_USERS',
    CLEAR_METADATA_USER_EDIT: 'CLEAR_METADATA_USER_EDIT',
    CLEAR_METADATA_USER_CREATE: 'CLEAR_METADATA_USER_CREATE',
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_ERROR: 'CREATE_USER_ERROR',
    DESTROY_USER_REQUEST: 'DESTROY_USER_REQUEST',
    DESTROY_USER_SUCCESS: 'DESTROY_USER_SUCCESS',
    DESTROY_USER_ERROR: 'DESTROY_USER_ERROR',
    GET_PAGINATED_USERS_REQUEST: 'GET_PAGINATED_USERS_REQUEST',
    GET_PAGINATED_USERS_SUCCESS: 'GET_PAGINATED_USERS_SUCCESS',
    GET_PAGINATED_USERS_ERROR: 'GET_PAGINATED_USERS_ERROR',
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_ERROR: 'GET_USER_ERROR',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
};

// action creators
export const changePageResources = payload => ({
    type: actions.CHANGE_PAGE_USERS,
    payload
});

export const clearMetadataResourceCreate = payload => ({
    type: actions.CLEAR_METADATA_USER_CREATE
});

export const clearMetadataResourceEdit = payload => ({
    type: actions.CLEAR_METADATA_USER_EDIT
});

export const clearMetadataResources = payload => ({
    type: actions.CLEAR_METADATA_USERS,
    payload
});

export const createResource = payload => ({
    type: actions.CREATE_USER_REQUEST,
    payload
});

export const destroyResource = payload => ({
    type: actions.DESTROY_USER_REQUEST,
    payload
});

export const getPaginatedResources = payload => ({
    type: actions.GET_PAGINATED_USERS_REQUEST,
    payload
});

export const getResource = payload => ({
    type: actions.GET_USER_REQUEST,
    payload
});

export const updateResource = payload => ({
    type: actions.UPDATE_USER_REQUEST,
    payload
});

export default actions;
