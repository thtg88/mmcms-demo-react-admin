import {
    destroyResourceBase,
    findResourceBase,
    getPaginatedResourcesBase,
    regenerateThumbnailsBase,
    updateResourceBase,
} from '../base/helper.js';
import { apiBaseEndpoint } from './variables';

const { REACT_APP_API_BASE_URL } = process.env;

export const createResource = async data => {
    const { token, ...rest } = data;
    const formData = new FormData();

    Object.entries(rest).forEach(([name, value]) => {
        formData.append(name, value);
    });

    return await fetch(REACT_APP_API_BASE_URL+apiBaseEndpoint, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            // 'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        }),
        body: formData,
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const destroyResource = destroyResourceBase(apiBaseEndpoint);

export const findResource = findResourceBase(apiBaseEndpoint);

export const getPaginatedResources = getPaginatedResourcesBase(apiBaseEndpoint);

export const regenerateThumbnails = regenerateThumbnailsBase(apiBaseEndpoint);

export const updateResource = updateResourceBase(apiBaseEndpoint);
