import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class LoadingAlert extends Component {
    render() {
        return (
            <Alert color="info">
                <i className="fa fa-spinner fa-spin"></i>
                {' '}
                {this.props.msg}
            </Alert>
        );
    }
}

export default LoadingAlert;
