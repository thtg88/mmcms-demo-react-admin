import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class RestrictedComponent extends Component {
    render() {

        const { logged_in } = this.props;

        if(logged_in === false) {
            return <Redirect to="/login" />
        }

        return this.props.children;
    }
}

const mapStateToProps = (state) => {
    return {
        logged_in: typeof state.auth.login.token !== 'undefined' && state.auth.login.token !== null
    }
};

export default connect(
    mapStateToProps
)(RestrictedComponent);
