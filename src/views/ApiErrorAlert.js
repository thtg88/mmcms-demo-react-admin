import React from 'react';
import { Alert } from 'reactstrap';

const ApiErrorAlert = ({ errors }) => {

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

export default ApiErrorAlert;
