import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class LoggingOutAlert extends Component {
    render() {
        const { loggingOut } = this.props;

        console.log(loggingOut);

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
    }
}
export default LoggingOutAlert;
