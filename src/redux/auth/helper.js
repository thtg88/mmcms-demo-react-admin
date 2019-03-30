const { REACT_APP_API_BASE_URL } = process.env;
const moduleBaseEndpoint = '/auth';

export const login = async data => {
    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint+'/login', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(data),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const register = async data => {
    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint+'/register', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(data),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const logout = async data => {
    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint+'/logout', {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": "Bearer "+data.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const getProfile = async data => {
    const { token } = data;

    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint+'/me', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const updateProfile = async data => {
    const { token, ...rest } = data;

    return await fetch(REACT_APP_API_BASE_URL+moduleBaseEndpoint+'/me', {
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'Bearer '+token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(rest),
    })
    .then(response => typeof response === 'object' && response instanceof Response ? response.json() : response);
};
