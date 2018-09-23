import React from 'react';
import { Alert } from 'reactstrap';

const LoggingOutAlert = ({ loggingOut }) => {

    if(loggingOut !== true) {
        return (
            null
        );
    }

    return (
        <Alert color="info">
            <i className="fa fa-spinner fa-spin"></i>
            {' '}
            Logging out...
        </Alert>
    );
};

export default LoggingOutAlert;
