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
        logged_in: state.auth && state.auth.token
    };
};

export default connect(
    mapStateToProps
)(GuestComponent);
