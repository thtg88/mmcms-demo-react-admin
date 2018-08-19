import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class ApiErrorAlert extends Component {
    render() {
        const { errors } = this.props;

        if(typeof errors === 'undefined' || errors === null || errors.length === 0) {
            return (
                null
            );
        }

        return (
            <Alert color="danger">
                {errors.map((error, idx) => (
                    <div key={idx}>{error}</div>
                ))}
            </Alert>
        );
    }
}
export default ApiErrorAlert;
