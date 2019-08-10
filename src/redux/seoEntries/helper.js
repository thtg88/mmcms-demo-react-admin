import {
    createResourceBase,
    destroyResourceBase,
    findResourceBase,
    updateResourceBase,
} from '../base/helper.js';
import { apiBaseEndpoint } from './variables';

export const createResource = createResourceBase(apiBaseEndpoint);

export const destroyResource = destroyResourceBase(apiBaseEndpoint);

export const findResource = findResourceBase(apiBaseEndpoint);

export const updateResource = updateResourceBase(apiBaseEndpoint);
