import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const RestrictedComponent = ({logged_in, children}) => {
    if(!logged_in) {
        return <Redirect to="/login" />;
    }

    return children;
};

const mapStateToProps = (state) => {
    return {
        logged_in: state.auth && state.auth.token,
    };
};

export default connect(
    mapStateToProps
)(RestrictedComponent);
