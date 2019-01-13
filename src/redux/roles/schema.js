import * as yup from 'yup';

const schema = {
    display_name: {
        errors: [],
        rules: yup.string()
            .required()
            .max(255),
        type: 'text',
        value: '',
    },
    name: {
        errors: [],
        rules: yup.string()
            .required()
            .max(255),
        type: 'text',
        value: '',
    },
    priority: {
        errors: [],
        rules: yup.number()
            .required()
            .integer()
            .min(0),
        type: 'number',
        value: '',
    },
};

export default schema;
