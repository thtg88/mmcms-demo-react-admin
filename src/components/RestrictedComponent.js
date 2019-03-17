import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import { isUnauthenticatedError } from '../helpers/apiErrorMessages';
import { loggedOut } from '../redux/auth/actions';

class RestrictedComponent extends Component {
    componentDidMount() {
        // We scroll to top at the mounting of restricted component as it seems
        // React leaves the scroll down if we have scrolled down to a previous page.
        // This means the scroll to top is going to be quick (1ms),
        // and the user shouldn't be noticing it
        scroll.scrollToTop({
            smooth: false,
            duration: 1,
        });
    }

    componentDidUpdate(prevProps) {
        const { loggedOut, unauthenticated } = this.props;

        // if unauthenticated redirect to login
        if(prevProps.unauthenticated === false && unauthenticated === true) {
            loggedOut();
        }
    }

    render() {
        const { children, logged_in } = this.props;

        if(!logged_in) {
            return <Redirect to="/login" />;
        }

        return children;
    }
}

const mapStateToProps = state => {
    const { token } = state.auth;
    // State will holds all the errors coming from the API
    // isUnauthenticatedError returns true if we are unauthenticated
    // Which means that if the length of the resulting filtered array is > 0
    // we are not authenticated anymore
    const unauthenticatedStates = Object.entries(state).filter(([reducerName, subState], idx) => {
        return isUnauthenticatedError(subState.error);
    });

    return {
        logged_in: typeof token !== 'undefined' && token !== null,
        unauthenticated: unauthenticatedStates.length > 0,
    };
};

const mapDispatchToProps = {
    loggedOut,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestrictedComponent);
