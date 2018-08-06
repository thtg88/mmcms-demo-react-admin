const normalizeApiErrors = (error) => {
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
                                console.log(idx, error, typeof error);
                                errors.push(error);
                            });
                        }
                    });

                }
            });
        }
    }

    // console.log('normalizeApiErrors errors normalized:', errors);

    return errors;
};
export default normalizeApiErrors;
