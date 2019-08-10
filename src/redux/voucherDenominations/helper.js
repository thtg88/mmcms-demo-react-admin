import {
    createResourceBase,
    destroyResourceBase,
    findResourceBase,
    getAllResourcesBase,
    getPaginatedResourcesBase,
    publishResourceBase,
    recoverResourceBase,
    searchResourcesBase,
    unpublishResourceBase,
    updateResourceBase,
} from '../base/helper.js';
import { apiBaseEndpoint } from './variables';

export const createResource = createResourceBase(apiBaseEndpoint);

export const destroyResource = destroyResourceBase(apiBaseEndpoint);

export const findResource = findResourceBase(apiBaseEndpoint);

export const getAllResources = getAllResourcesBase(apiBaseEndpoint);

export const getPaginatedResources = getPaginatedResourcesBase(apiBaseEndpoint);

export const publishResource = publishResourceBase(apiBaseEndpoint);

export const recoverResource = recoverResourceBase(apiBaseEndpoint);

export const searchResources = searchResourcesBase(apiBaseEndpoint);

export const unpublishResource = unpublishResourceBase(apiBaseEndpoint);

export const updateResource = updateResourceBase(apiBaseEndpoint);
