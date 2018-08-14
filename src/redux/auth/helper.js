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
    return await fetch(process.env.REACT_APP_API_BASE_URL+'/auth/logout', {
        method: 'POST',
        headers: new Headers({
            "Authentication": "Bearer "+data.token.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};
