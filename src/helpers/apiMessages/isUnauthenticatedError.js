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

    // IF error a TypeError
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

export default isUnauthenticatedError;
