export const getPaginatedUsers = async (data) => {
    // console.log('getPaginatedUsers data', data);
    const { token, page, page_size } = data;
    const url = process.env.REACT_APP_API_BASE_URL
        +'/users/paginate'
        +'?page='+page
        +'&page_size='+page_size;
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
    console.log('getUser data', data);
    const { token, id } = data;
    const url = process.env.REACT_APP_API_BASE_URL+'/users/'+id;
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
    console.log(token, id, rest);
    console.log('updateUser rest', rest);
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
