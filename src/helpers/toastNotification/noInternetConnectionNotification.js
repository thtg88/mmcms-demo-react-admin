import toastNotification from './toastNotification';

const noInternetConnectionNotification = () => toastNotification({
    iconClassName: 'fa-warning',
    message: 'You don\'t seem to be connected to the internet. Please check your internet connection and refresh the page.',
    type: 'danger',
});

export default noInternetConnectionNotification;
