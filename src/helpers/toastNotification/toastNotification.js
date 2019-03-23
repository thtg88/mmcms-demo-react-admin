import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const toastNotification = ({
    iconClassName,
    message,
    onClose,
    title,
    type,
}) => toast(
    <div className="notification-container">
    	<div className="notification-content">
			<i className={`notification-icon fa fa-fw fa-lg ${iconClassName} notification-icon-${type}`}></i>
            {
                typeof title !== 'undefined'
                && title !== null
                && title !== ''
                    ? <div className="notification-title">{title}</div>
                    : null
            }
			<div className="notification-message">{message}</div>
    	</div>
    </div>
, { onClose });

toastNotification.propTypes = {
    iconClassName: PropTypes.string,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string.isRequired
};

export default toastNotification;
