import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const LoggingOutAlert = ({ loggingOut }) => {
    if(loggingOut !== true) {
        return null;
    }

    return (
        <Alert color="info">
            <i className="fa fa-spinner fa-spin"></i>
            {' '}
            Logging out...
        </Alert>
    );
};

LoggingOutAlert.propTypes = {
    loggingOut: PropTypes.bool,
};

export default LoggingOutAlert;
