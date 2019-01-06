import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const notification = ({
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

notification.propTypes = {
    iconClassName: PropTypes.string,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string.isRequired
};

export default notification;

export const apiResourceCreateSuccessNotification = ({ resourceDisplayName }) => notification({
    iconClassName: 'fa-check',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' created successfully.',
    // onClose: () => console.log('closed')
    type: 'success',
});

apiResourceCreateSuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export const apiResourceDestroySuccessNotification = ({ resourceDisplayName }) => notification({
    iconClassName: 'fa-trash',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' destroyed successfully.',
    // onClose: () => console.log('closed')
    type: 'success',
});

apiResourceDestroySuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export const apiResourceUpdateSuccessNotification = ({ resourceDisplayName }) => notification({
    iconClassName: 'fa-check',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' updated successfully.',
    // onClose: () => console.log('closed')
    type: 'success',
});

apiResourceUpdateSuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};
