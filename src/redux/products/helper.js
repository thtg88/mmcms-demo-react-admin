import { replaceUrlParameters } from '../../helpers/url';
import {
    createResourceBase,
    destroyResourceBase,
    findResourceBase,
    generateVariantsBase,
    getAllResourcesBase,
    getPaginatedResourcesBase,
    publishResourceBase,
    recoverResourceBase,
    searchResourcesBase,
    unpublishResourceBase,
    updateResourceBase,
} from '../base/helper.js';
import { apiBaseEndpoint } from './variables';

const { REACT_APP_API_BASE_URL } = process.env;

export const createResource = createResourceBase(apiBaseEndpoint);

export const destroyResource = destroyResourceBase(apiBaseEndpoint);

export const findResource = findResourceBase(apiBaseEndpoint);

export const generateVariants = generateVariantsBase(apiBaseEndpoint);

export const getAllResources = getAllResourcesBase(apiBaseEndpoint);

export const getPaginatedResources = getPaginatedResourcesBase(apiBaseEndpoint);

export const getClubOrderLines = async data => {
    const { product_id, token } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'+product_id
        +'/club-order-lines';

    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const publishResource = publishResourceBase(apiBaseEndpoint);

export const recoverResource = recoverResourceBase(apiBaseEndpoint);

export const searchResources = searchResourcesBase(apiBaseEndpoint);

export const unpublishResource = unpublishResourceBase(apiBaseEndpoint);

export const updateResource = updateResourceBase(apiBaseEndpoint);
