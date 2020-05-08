import {
    createResourceBase,
    destroyResourceBase,
    findResourceBase,
    getPaginatedResourcesBase,
    recoverResourceBase,
    updateResourceBase,
} from '../base/helper.js';
import { apiBaseEndpoint } from './variables';

export const createResource = createResourceBase(apiBaseEndpoint);

export const destroyResource = destroyResourceBase(apiBaseEndpoint);

export const findResource = findResourceBase(apiBaseEndpoint);

export const getPaginatedResources = getPaginatedResourcesBase(apiBaseEndpoint);

export const recoverResource = recoverResourceBase(apiBaseEndpoint);

export const updateResource = updateResourceBase(apiBaseEndpoint);
