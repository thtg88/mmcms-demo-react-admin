import { getActions } from '../base/actions';
import { reducerName } from './variables';

const actions = getActions(reducerName);

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

export const setResource = payload => ({
    type: actions.SET_RESOURCE,
    payload,
});

export default actions;
