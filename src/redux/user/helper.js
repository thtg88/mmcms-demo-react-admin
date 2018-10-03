export const createUser = async (data) => {
    const { token, ...rest } = data;

    // console.log(token, rest);
    // console.log('createUser rest', rest);

    return await fetch(process.env.REACT_APP_API_BASE_URL+'/users', {
        method: 'POST',
        headers: new Headers({
            "Authorization": "Bearer "+token.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
        body: JSON.stringify(rest),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const destroyUser = async (data) => {
    const { token, id } = data;

    // console.log(token, id);
    // console.log('destroyUser', id);

    return await fetch(process.env.REACT_APP_API_BASE_URL+'/users/'+id, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": "Bearer "+token.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const getPaginatedUsers = async (data) => {
    const { token, page, pageSize, q } = data;
    const url = process.env.REACT_APP_API_BASE_URL
        +'/users/paginate'
        +'?page='+page
        +'&page_size='+pageSize
        +(
            typeof q !== 'undefined'
            && q !== null
            && q !== ''
                ? '&q='+q
                : ''
        );

    // console.log('getPaginatedUsers data', data);

    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
            "Authorization": "Bearer "+token.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const getUser = async (data) => {
    const { token, id } = data;
    const url = process.env.REACT_APP_API_BASE_URL+'/users/'+id;

    // console.log('getUser data', data);

    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
            "Authorization": "Bearer "+token.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const updateUser = async (data) => {
    const { token, id, ...rest } = data;

    // console.log(token, id, rest);
    // console.log('updateUser rest', rest);

    return await fetch(process.env.REACT_APP_API_BASE_URL+'/users/'+id, {
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
