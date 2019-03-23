import PropTypes from 'prop-types';
import toastNotification from './toastNotification';

const apiResourceUnpublishSuccessNotification = ({ resourceDisplayName }) => toastNotification({
    iconClassName: 'fa-check',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' unpublished successfully.',
    type: 'success',
});

apiResourceUnpublishSuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export default apiResourceUnpublishSuccessNotification;
