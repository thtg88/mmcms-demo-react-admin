import PropTypes from 'prop-types';
import toastNotification from './toastNotification';

const apiResourceUpdateSuccessNotification = ({ resourceDisplayName }) => toastNotification({
    iconClassName: 'fa-check',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' updated successfully.',
    type: 'success',
});

apiResourceUpdateSuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export default apiResourceUpdateSuccessNotification;
