import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestComponent = ({ children }) => {
    const logged_in = useSelector(state => (
        typeof state.auth.token !== 'undefined'
        && state.auth.token !== null
    ));

    if(logged_in) {
        return <Redirect to="/" />;
    }

    return children;
};

export default GuestComponent;
