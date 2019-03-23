import toastNotification from './toastNotification';

const apiValidationErrorsNotification = () => toastNotification({
    iconClassName: 'fa-warning',
    message: 'There were problems with the values you submitted.',
    type: 'danger',
});

export default apiValidationErrorsNotification;
