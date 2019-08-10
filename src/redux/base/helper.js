import { replaceUrlParameters } from '../../helpers/url';

const { REACT_APP_API_BASE_URL } = process.env;

export const createResourceBase = apiBaseEndpoint => async data => {
    const { token, ...rest } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data);

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const destroyResourceBase = apiBaseEndpoint => async data => {
    const { token, id } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id;

    return await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const findResourceBase = apiBaseEndpoint => async data => {
    const { token, id, recovery } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id
        +(
            parseInt(recovery, 10) === 1
                ? '?recovery=1'
                : ''
        );

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

export const generateVariantsBase = apiBaseEndpoint => async data => {
    const { token, id, ...rest } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id
        +'/generate-variants';

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const getAllResourcesBase = apiBaseEndpoint => async data => {
    const { token } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data);

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

export const getPaginatedResourcesBase = apiBaseEndpoint => async data => {
    const {
        token,
        page,
        pageSize,
        q,
        recovery,
        sort_name,
        sort_direction,
        filters,
    } = data;
    let url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/paginate'
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
        filters.forEach(({name, fieldName, operator, value}, idx) => {
            url = url + `&filters[${idx}][name]=${fieldName ? fieldName : name}`
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
};

export const publishResourceBase = apiBaseEndpoint => async data => {
    const { token, id, ...rest } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id
        +'/publish';

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const recoverResourceBase = apiBaseEndpoint => async data => {
    const { token, id } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id
        +'/restore';

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const regenerateResourceBase = apiBaseEndpoint => async data => {
    const { token, id } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id
        +'/regenerate';

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const regenerateThumbnailsBase = apiBaseEndpoint => async data => {
    const { token, id } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id
        +'/regenerate-thumbnails';

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const runReportBase = apiBaseEndpoint => async data => {
    const { token, type, ...rest } = data;
    let url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +type;
    if(Object.entries(rest).length > 0) {
        const url_arr = [];

        Object.entries(rest).forEach(([name, value], idx) => {
            url_arr.push(name+'='+value);
        });

        if(url_arr.length > 0) {
            url = url + '?' + url_arr.join('&');
        }
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
};

export const searchResourcesBase = apiBaseEndpoint => async data => {
    const { token, q } = data;
    let url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/search'
        +'?q='+q;

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

export const sendCodeResourceBase = apiBaseEndpoint => async data => {
    const { token, id, ...rest } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id
        +'/send-code';

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const setSequenceResourcesBase = apiBaseEndpoint => async data => {
    const { token, ...rest } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/sequences';

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const unpublishResourceBase = apiBaseEndpoint => async data => {
    const { token, id, ...rest } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id
        +'/unpublish';

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const updateAttributesResourceBase = apiBaseEndpoint => async data => {
    const { token, id, ...rest } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id
        +'/attributes';

    return await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const updateResourceBase = apiBaseEndpoint => async data => {
    const { token, id, ...rest } = data;
    const url = REACT_APP_API_BASE_URL
        +replaceUrlParameters(apiBaseEndpoint, data)
        +'/'
        +id;

    return await fetch(url, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};
