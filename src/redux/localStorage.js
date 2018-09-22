export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        // console.log('state loaded: ', serializedState);
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);

    } catch(err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(sanitizeState(state));
        localStorage.setItem('state', serializedState);
        // console.log('state saved: ', serializedState);

    } catch(err) {
        console.log(err);
    }
}

export const sanitizeState = (state) => {
    const { token, user } = state.auth;
    // const {
    //     current_page,
    //     resource,
    //     resources,
    //     total
    // } = state.users;
    return {
        auth: { token, user },
        users: {
            //
        }
    }
};
