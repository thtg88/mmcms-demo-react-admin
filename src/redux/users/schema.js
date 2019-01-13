import * as yup from 'yup';

const schema = {
    name: {
        errors: [],
        rules: yup.string()
            .required()
            .max(255),
        type: 'text',
        value: '',
    },
    email: {
        errors: [],
        rules: yup.string()
            .required()
            .email()
            .max(255),
        type: 'email',
        value: '',
    },
    password: {
        errors: [],
        rules: yup.string()
            .required()
            .min(6)
            .max(255),
        type: 'password',
        value: '',
    },
    password_confirmation: {
        errors: [],
        label: 'Confirm Password',
        placeholder: 'Confirm your password',
        rules: yup.string()
            .required()
            .min(6)
            .max(255),
        type: 'password',
        value: '',
    },
};

export default schema;
