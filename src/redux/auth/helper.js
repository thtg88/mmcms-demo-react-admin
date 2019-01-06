export const login = async (data) => {
    return await fetch(process.env.REACT_APP_API_BASE_URL+'/auth/login', {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
        body: JSON.stringify(data),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const register = async (data) => {
    return await fetch(process.env.REACT_APP_API_BASE_URL+'/auth/register', {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
        body: JSON.stringify(data),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const logout = async (data) => {
    // console.log('logout data', data);

    return await fetch(process.env.REACT_APP_API_BASE_URL+'/auth/logout', {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": "Bearer "+data.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const getProfile = async (data) => {
    // console.log('getProfile data', data);

    return await fetch(process.env.REACT_APP_API_BASE_URL+'/auth/me', {
        method: 'GET',
        headers: new Headers({
            "Authorization": "Bearer "+data.token.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const updateProfile = async (data) => {
    const { token, ...rest } = data;

    // console.log(token, rest);
    // console.log('updateProfile data', data);

    return await fetch(process.env.REACT_APP_API_BASE_URL+'/auth/me', {
        method: 'PUT',
        headers: new Headers({
            "Authorization": "Bearer "+token.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};
