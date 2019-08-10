import PropTypes from 'prop-types';
import toastNotification from './toastNotification';

const apiResourceVariantsGenerateSuccessNotification = ({ iconClassName }) => toastNotification({
    iconClassName: iconClassName ? iconClassName : 'fa-check-square-o',
    message: 'Variants generated successfully.',
    type: 'success',
});

apiResourceVariantsGenerateSuccessNotification.propTypes = {
    iconClassName: PropTypes.string
};

export default apiResourceVariantsGenerateSuccessNotification;
