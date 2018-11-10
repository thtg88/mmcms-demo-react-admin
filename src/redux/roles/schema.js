import * as yup from 'yup';

const schema = {
    display_name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
        errors: [],
    },
    name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
        errors: [],
    },
    priority: {
        type: 'number',
        value: '',
        rules: yup.number()
            .required()
            .integer()
            .min(0),
        errors:[]
    },
};

export default schema;
