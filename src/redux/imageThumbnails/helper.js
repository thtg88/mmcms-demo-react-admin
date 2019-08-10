import {
    createResourceBase,
    destroyResourceBase,
    findResourceBase,
    getAllResourcesBase,
    recoverResourceBase,
    regenerateResourceBase,
    updateResourceBase,
} from '../base/helper.js';
import { apiBaseEndpoint } from './variables';

const { REACT_APP_API_BASE_URL } = process.env;

export const createResource = createResourceBase(apiBaseEndpoint);

export const destroyResource = destroyResourceBase(apiBaseEndpoint);

export const findResource = findResourceBase(apiBaseEndpoint);

export const getAllResources = getAllResourcesBase(apiBaseEndpoint);

export const getPaginatedResources = async data => {
    const {
        token,
        page,
        pageSize,
        image_id,
        q,
        recovery,
        sort_name,
        sort_direction,
        filters,
    } = data;
    let url = REACT_APP_API_BASE_URL
        +'/images'
        +'/'+image_id
        +'/thumbnails/paginate'
        +'?page='+page
        +'&page_size='+pageSize
        +(
            sort_name
                ? '&sort_name='+sort_name
                : ''
        )
        +(
            sort_direction
                ? '&sort_direction='+sort_direction
                : ''
        )
        +(
            typeof q !== 'undefined'
            && q !== null
            && q !== ''
                ? '&q='+q
                : ''
        )
        +(
            parseInt(recovery, 10) === 1
                ? '&recovery=1'
                : ''
        );
    if(filters && filters.length) {
        filters.forEach(({name, operator, value}, idx) => {
            url = url + `&filters[${idx}][name]=${name}`
                + `&filters[${idx}][operator]=${operator}`
                + `&filters[${idx}][value]=${value}`;
        });
    }

    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};;

export const recoverResource = recoverResourceBase(apiBaseEndpoint);

export const regenerateResource = regenerateResourceBase(apiBaseEndpoint);

export const updateResource = updateResourceBase(apiBaseEndpoint);
