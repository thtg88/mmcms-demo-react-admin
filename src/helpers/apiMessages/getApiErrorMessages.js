/**
 * Normalizes the API errors into an array format, containing all the messages.
 * Returns an empty array if no errors returned by the API.
 */
const getApiErrorMessages = (error, skipTokenNotProvidedError = true) => {
    let errors = [];

    if(typeof error !== 'undefined' && error !== null) {
        if(typeof error !== 'object') {
            errors.push(error);

        } else if(error instanceof TypeError) {
            errors.push(error.message);

        } else {
            Object.entries(error).forEach(([key, value]) => {
                if(typeof value !== 'object') {
                    errors.push(value);

                } else if (typeof value !== 'undefined' && value !== null) {
                    Object.entries(value).forEach(([field, error_arr]) => {
                        if(typeof error_arr !== 'object') {
                            if(key !== 'token_not_provided' || skipTokenNotProvidedError === false) {
                                // This avoids a redirect to the login screen
                                // with the "Token not provided" error
                                errors.push(error_arr);
                            }
                        } else {
                            Object.entries(error_arr).forEach(([idx, error]) => {
                                errors.push(error);
                            });
                        }
                    });
                }
            });
        }
    }

    return errors;
};

export default getApiErrorMessages;
