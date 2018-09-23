import React from 'react';
import { Alert } from 'reactstrap';

const LoadingAlert = ({ msg }) => (
    <Alert color="info">
        <i className="fa fa-spinner fa-spin"></i>
        {' '}
        {msg}
    </Alert>
);

export default LoadingAlert;
