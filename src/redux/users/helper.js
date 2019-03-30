const { REACT_APP_API_BASE_URL } = process.env;
const moduleBaseEndpoint = '/users';

export const createResource = async data => {
    const { token, ...rest } = data;

    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const destroyResource = async data => {
    const { token, id } = data;

    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint+'/'+id, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const findResource = async data => {
    const { token, id } = data;
    const url = REACT_APP_API_BASE_URL+moduleBaseEndpoint+'/'+id;

    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const getAllResources = async data => {
    const { token } = data;
    const url = moduleBaseEndpoint;

    return await fetch(REACT_APP_API_BASE_URL+url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const getPaginatedResources = async data => {
    const { token, page, pageSize, q, sort_name, sort_direction } = data;
    const url = REACT_APP_API_BASE_URL
        +moduleBaseEndpoint+'/paginate'
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
        );

    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const recoverResource = async data => {
    const { token, id } = data;

    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint+'/'+id+'/restore', {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const updateResource = async data => {
    const { token, id, ...rest } = data;

    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint+'/'+id, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};
