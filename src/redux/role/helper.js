export const createRole = async (data) => {
    const { token, ...rest } = data;

    // console.log(token, rest);
    // console.log('createRole rest', rest);

    return await fetch(process.env.REACT_APP_API_BASE_URL+'/roles', {
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

export const destroyRole = async (data) => {
    const { token, id } = data;

    // console.log(token, id);
    // console.log('destryoRole', id);

    return await fetch(process.env.REACT_APP_API_BASE_URL+'/roles/'+id, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": "Bearer "+token.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const getPaginatedRoles = async (data) => {
    const { token, page, pageSize, q } = data;
    const url = process.env.REACT_APP_API_BASE_URL
        +'/roles/paginate'
        +'?page='+page
        +'&page_size='+pageSize
        +(
            typeof q !== 'undefined'
            && q !== null
            && q !== ''
                ? '&q='+q
                : ''
        );

    // console.log('getPaginatedRoles data', data);

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

export const getRole = async (data) => {
    const { token, id } = data;
    const url = process.env.REACT_APP_API_BASE_URL+'/roles/'+id;

    // console.log('getRole data', data);

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

export const updateRole = async (data) => {
    const { token, id, ...rest } = data;

    // console.log(token, id, rest);
    // console.log('updateRole rest', rest);

    return await fetch(process.env.REACT_APP_API_BASE_URL+'/roles/'+id, {
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
