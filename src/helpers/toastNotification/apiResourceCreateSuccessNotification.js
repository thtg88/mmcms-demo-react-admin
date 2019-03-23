import PropTypes from 'prop-types';
import toastNotification from './toastNotification';

const apiResourceCreateSuccessNotification = ({ resourceDisplayName, iconClassName }) => toastNotification({
    iconClassName: iconClassName ? iconClassName : 'fa-check',
    message: (resourceDisplayName ? resourceDisplayName : "Resource")
        +' created successfully.',
    type: 'success',
});

apiResourceCreateSuccessNotification.propTypes = {
    resourceDisplayName: PropTypes.string
};

export default apiResourceCreateSuccessNotification;
