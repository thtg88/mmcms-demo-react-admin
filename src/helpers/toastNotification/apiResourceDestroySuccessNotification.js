import PropTypes from 'prop-types';
import toastNotification from './toastNotification';

const apiResourceDestroySuccessNotification = ({ resourceDisplayName, iconClassName }) => toastNotification({
    iconClassName: iconClassName ? iconClassName : 'fa-trash',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' removed successfully.',
    type: 'success',
});

apiResourceDestroySuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export default apiResourceDestroySuccessNotification;
