import {
    createResourceBase,
    destroyResourceBase,
    findResourceBase,
} from '../base/helper.js';
import { apiBaseEndpoint } from './variables';

export const createResource = createResourceBase(apiBaseEndpoint);

export const destroyResource = destroyResourceBase(apiBaseEndpoint);

export const findResource = findResourceBase(apiBaseEndpoint);
