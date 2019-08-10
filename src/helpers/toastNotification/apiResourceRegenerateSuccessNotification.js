import PropTypes from 'prop-types';
import toastNotification from './toastNotification';

const apiResourceRegenerateSuccessNotification = ({ resourceDisplayName }) => toastNotification({
    iconClassName: 'fa-check',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' regenerated successfully.',
    type: 'success',
});

apiResourceRegenerateSuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export default apiResourceRegenerateSuccessNotification;
