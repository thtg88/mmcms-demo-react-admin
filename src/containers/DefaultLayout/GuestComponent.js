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
    const { token } = state.auth;

    return {
        logged_in: typeof token !== 'undefined' && token !== null
    }
};

export default connect(
    mapStateToProps
)(GuestComponent);
