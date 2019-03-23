import createActionName from '../createActionName';

export const reducerName = 'images';

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
export const UPDATE_RESOURCE_REQUEST = createActionName(reducerName, 'UPDATE_RESOURCE_REQUEST');
export const UPDATE_RESOURCE_SUCCESS = createActionName(reducerName, 'UPDATE_RESOURCE_SUCCESS');
export const UPDATE_RESOURCE_ERROR = createActionName(reducerName, 'UPDATE_RESOURCE_ERROR');

// actions
const actions = {
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
	UPDATE_RESOURCE_REQUEST,
	UPDATE_RESOURCE_SUCCESS,
	UPDATE_RESOURCE_ERROR,
};

// action creators
export const clearMetadataResourceCreate = payload => ({
    type: actions.CLEAR_METADATA_RESOURCE_CREATE,
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

export const updateResource = payload => ({
    type: actions.UPDATE_RESOURCE_REQUEST,
    payload,
});

export default actions;
