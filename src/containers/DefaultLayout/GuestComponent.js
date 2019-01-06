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

const mapStateToProps = (state) => {
    return {
        logged_in: state.auth && state.auth.token
    };
};

export default connect(
    mapStateToProps
)(GuestComponent);
