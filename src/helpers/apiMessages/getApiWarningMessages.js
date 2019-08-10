/**
 * Normalizes the API warnings into an array format, containing all the messages.
 * Returns an empty array if no warnings returned by the API.
 */
const getApiWarningMessages = warning => {
    let warnings = [];

    if(typeof warning !== 'undefined' && warning !== null) {
        if(typeof warning !== 'object') {
            warnings.push(warning);

        } else if(warning instanceof TypeError) {
            warnings.push(warning.message);

        } else {
            Object.entries(warning).forEach(([key, value]) => {
                if(typeof value !== 'object') {
                    warnings.push(value);

                } else if (typeof value !== 'undefined' && value !== null) {
                    Object.entries(value).forEach(([field, warning_arr]) => {
                        if(typeof warning_arr !== 'object') {
                            warnings.push(warning_arr);
                        } else {
                            Object.entries(warning_arr).forEach(([idx, warning]) => {
                                warnings.push(warning);
                            });
                        }
                    });
                }
            });
        }
    }

    return warnings;
};

export default getApiWarningMessages;
