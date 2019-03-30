const moduleBaseEndpoint = '/seo-entries';
const { REACT_APP_API_BASE_URL } = process.env;

export const createResource = async data => {
    const { token, ...rest } = data;
    const formData = new FormData();

    Object.entries(rest).forEach(([name, value]) => {
        formData.append(name, value);
    });

    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint, {
        method: 'POST',
        headers: new Headers({
            'Authorization': token.token_type+' '+token.access_token,
            // 'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        }),
        body: formData,
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
    const { token, id, recovery } = data;
    const url = moduleBaseEndpoint+'/'+id
        +(
            parseInt(recovery, 10) === 1
                ? '?recovery=1'
                : ''
        );

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
