import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const LoadingAlert = ({ msg }) => (
    <Alert color="info">
        <i className="fa fa-spinner fa-spin"></i>
        {' '}
        {msg}
    </Alert>
);

LoadingAlert.propTypes = {
    msg: PropTypes.string
};

export default LoadingAlert;
