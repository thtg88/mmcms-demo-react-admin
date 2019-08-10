import PropTypes from 'prop-types';
import toastNotification from './toastNotification';

const apiResourceSendCodeSuccessNotification = ({ resourceDisplayName }) => toastNotification({
    iconClassName: 'fa-check',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' Code Sent successfully.',
    type: 'success',
});

apiResourceSendCodeSuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export default apiResourceSendCodeSuccessNotification;
