export const getPaginatedRoles = async (data) => {
    console.log('getPaginatedRoles data', data);
    const { token, page, pageSize } = data;
    const url = process.env.REACT_APP_API_BASE_URL
        +'/roles/paginate'
        +'?page='+page
        +'&page_size='+pageSize;
    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
            "Authorization": "Bearer "+data.token.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
    })
    .then((response) => typeof response === 'object' && response instanceof Response ? response.json() : response);
};

export const updateRole = async (data) => {
    const { token, id, ...rest } = data;
    console.log(token, id, rest);
    console.log('updateRole data', data);
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
