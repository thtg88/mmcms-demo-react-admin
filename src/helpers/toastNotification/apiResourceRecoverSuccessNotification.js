import PropTypes from 'prop-types';
import toastNotification from './toastNotification';

const apiResourceRecoverSuccessNotification = ({ resourceDisplayName }) => toastNotification({
    iconClassName: 'fa-check',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' recovered successfully.',
    type: 'success',
});

apiResourceRecoverSuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export default apiResourceRecoverSuccessNotification;
