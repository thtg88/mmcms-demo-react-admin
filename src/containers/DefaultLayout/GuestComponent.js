import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestComponent = ({
    children,
    logged_in,
}) => (
    logged_in
        ? <Redirect to="/" />
        : children
);

const mapStateToProps = state => {
    const { token } = state.auth;

    return {
        logged_in: typeof token !== 'undefined' && token !== null,
    };
};

export default connect(
    mapStateToProps
)(GuestComponent);
