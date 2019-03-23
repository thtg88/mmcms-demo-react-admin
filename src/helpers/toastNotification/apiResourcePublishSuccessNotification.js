import PropTypes from 'prop-types';
import toastNotification from './toastNotification';

const apiResourcePublishSuccessNotification = ({ resourceDisplayName }) => toastNotification({
    iconClassName: 'fa-check',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' published successfully.',
    type: 'success',
});

apiResourcePublishSuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export default apiResourcePublishSuccessNotification;
