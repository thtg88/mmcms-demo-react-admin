import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const LoggedOutAlert = ({ logged_out }) => {

    if(logged_out !== true) {
        return (
            null
        );
    }

    return (
        <Alert color="info">
            <div>You have been logged out.</div>
        </Alert>
    );
};

LoggedOutAlert.propTypes = {
    logged_out: PropTypes.bool
};

export default LoggedOutAlert;
