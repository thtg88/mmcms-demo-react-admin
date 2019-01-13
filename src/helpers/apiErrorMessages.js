/**
 * Normalizes the API errors into an array format, containing all the messages.
 * Returns an empty array if no errors returned by the API.
 */
export const getApiErrorMessages = (error) => {
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

                } else {
                    Object.entries(value).forEach(([field, error_arr]) => {
                        if(typeof error_arr !== 'object') {
                            errors.push(error_arr);
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

/**
 * Returns whether the API error is "unauthenticated" or not.
 */
export const isUnauthenticatedError = (error) => {
    // If error undefined or null
    if(typeof error === 'undefined' || error === null) {
        return false;
    }

    // If error not an object
    if(typeof error !== 'object') {
        return false;
    }

    // If error a TypeError
    if(error instanceof TypeError) {
        return false;
    }

    let unauthenticated = false;

    // Loop all the object attributes
    Object.entries(error).forEach(([key, value]) => {
        if(key === 'unauthenticated') {
            unauthenticated = true;
        }
    });

    return unauthenticated;
};
