import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class GuestComponent extends Component {
    render() {

        const { logged_in } = this.props;

        if(logged_in === true) {
            return <Redirect to="/" />
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
)(GuestComponent);
