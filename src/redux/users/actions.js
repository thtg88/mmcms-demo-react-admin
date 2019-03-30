import createActionName from '../createActionName';

export const reducerName = 'users';

export const CHANGE_PAGE_RESOURCES = createActionName(reducerName, 'CHANGE_PAGE_RESOURCES');
export const CLEAR_METADATA_RESOURCES = createActionName(reducerName, 'CLEAR_METADATA_RESOURCES');
export const CLEAR_METADATA_RESOURCE_EDIT = createActionName(reducerName, 'CLEAR_METADATA_RESOURCE_EDIT');
export const CLEAR_METADATA_RESOURCE_CREATE = createActionName(reducerName, 'CLEAR_METADATA_RESOURCE_CREATE');
export const CREATE_RESOURCE_REQUEST = createActionName(reducerName, 'CREATE_RESOURCE_REQUEST');
export const CREATE_RESOURCE_SUCCESS = createActionName(reducerName, 'CREATE_RESOURCE_SUCCESS');
export const CREATE_RESOURCE_ERROR = createActionName(reducerName, 'CREATE_RESOURCE_ERROR');
export const DESTROY_RESOURCE_REQUEST = createActionName(reducerName, 'DESTROY_RESOURCE_REQUEST');
export const DESTROY_RESOURCE_SUCCESS = createActionName(reducerName, 'DESTROY_RESOURCE_SUCCESS');
export const DESTROY_RESOURCE_ERROR = createActionName(reducerName, 'DESTROY_RESOURCE_ERROR');
export const FIND_RESOURCE_REQUEST = createActionName(reducerName, 'FIND_RESOURCE_REQUEST');
export const FIND_RESOURCE_SUCCESS = createActionName(reducerName, 'FIND_RESOURCE_SUCCESS');
export const FIND_RESOURCE_ERROR = createActionName(reducerName, 'FIND_RESOURCE_ERROR');
export const GET_ALL_RESOURCES_REQUEST = createActionName(reducerName, 'GET_ALL_RESOURCES_REQUEST');
export const GET_ALL_RESOURCES_SUCCESS = createActionName(reducerName, 'GET_ALL_RESOURCES_SUCCESS');
export const GET_ALL_RESOURCES_ERROR = createActionName(reducerName, 'GET_ALL_RESOURCES_ERROR');
export const GET_PAGINATED_RESOURCES_REQUEST = createActionName(reducerName, 'GET_PAGINATED_RESOURCES_REQUEST');
export const GET_PAGINATED_RESOURCES_SUCCESS = createActionName(reducerName, 'GET_PAGINATED_RESOURCES_SUCCESS');
export const GET_PAGINATED_RESOURCES_ERROR = createActionName(reducerName, 'GET_PAGINATED_RESOURCES_ERROR');
export const RECOVER_RESOURCE_REQUEST = createActionName(reducerName, 'RECOVER_RESOURCE_REQUEST');
export const RECOVER_RESOURCE_SUCCESS = createActionName(reducerName, 'RECOVER_RESOURCE_SUCCESS');
export const RECOVER_RESOURCE_ERROR = createActionName(reducerName, 'RECOVER_RESOURCE_ERROR');
export const UPDATE_RESOURCE_REQUEST = createActionName(reducerName, 'UPDATE_RESOURCE_REQUEST');
export const UPDATE_RESOURCE_SUCCESS = createActionName(reducerName, 'UPDATE_RESOURCE_SUCCESS');
export const UPDATE_RESOURCE_ERROR = createActionName(reducerName, 'UPDATE_RESOURCE_ERROR');

// actions
const actions = {
  	CHANGE_PAGE_RESOURCES,
  	CLEAR_METADATA_RESOURCES,
  	CLEAR_METADATA_RESOURCE_EDIT,
  	CLEAR_METADATA_RESOURCE_CREATE,
  	CREATE_RESOURCE_REQUEST,
  	CREATE_RESOURCE_SUCCESS,
  	CREATE_RESOURCE_ERROR,
  	DESTROY_RESOURCE_REQUEST,
  	DESTROY_RESOURCE_SUCCESS,
  	DESTROY_RESOURCE_ERROR,
  	FIND_RESOURCE_REQUEST,
  	FIND_RESOURCE_SUCCESS,
  	FIND_RESOURCE_ERROR,
    GET_ALL_RESOURCES_REQUEST,
	GET_ALL_RESOURCES_SUCCESS,
	GET_ALL_RESOURCES_ERROR,
	GET_PAGINATED_RESOURCES_REQUEST,
  	GET_PAGINATED_RESOURCES_SUCCESS,
  	GET_PAGINATED_RESOURCES_ERROR,
    RECOVER_RESOURCE_REQUEST,
    RECOVER_RESOURCE_SUCCESS,
    RECOVER_RESOURCE_ERROR,
  	UPDATE_RESOURCE_REQUEST,
  	UPDATE_RESOURCE_SUCCESS,
  	UPDATE_RESOURCE_ERROR,
};

// action creators
export const changePageResources = payload => ({
    type: actions.CHANGE_PAGE_RESOURCES,
    payload,
});

export const clearMetadataResourceCreate = payload => ({
    type: actions.CLEAR_METADATA_RESOURCE_CREATE,
});

export const clearMetadataResourceEdit = payload => ({
    type: actions.CLEAR_METADATA_RESOURCE_EDIT,
});

export const clearMetadataResources = payload => ({
    type: actions.CLEAR_METADATA_RESOURCES,
    payload,
});

export const createResource = payload => ({
    type: actions.CREATE_RESOURCE_REQUEST,
    payload,
});

export const destroyResource = payload => ({
    type: actions.DESTROY_RESOURCE_REQUEST,
    payload,
});

export const findResource = payload => ({
    type: actions.FIND_RESOURCE_REQUEST,
    payload,
});

export const getAllResources = payload => ({
    type: actions.GET_ALL_RESOURCES_REQUEST,
    payload,
});

export const getPaginatedResources = payload => ({
    type: actions.GET_PAGINATED_RESOURCES_REQUEST,
    payload,
});

export const recoverResource = payload => ({
    type: actions.RECOVER_RESOURCE_REQUEST,
    payload,
});

export const updateResource = payload => ({
    type: actions.UPDATE_RESOURCE_REQUEST,
    payload,
});

export default actions;
