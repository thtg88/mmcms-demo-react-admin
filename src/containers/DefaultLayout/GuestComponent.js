import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestComponent = ({
    children,
    logged_in,
}) => {
    if(logged_in) {
        return <Redirect to="/" />;
    }

    return children;
};

const mapStateToProps = state => {
    const { token } = state.auth;

    return {
        logged_in: typeof token !== 'undefined' && token !== null,
    };
};

export default connect(
    mapStateToProps
)(GuestComponent);
