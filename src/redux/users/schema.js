import * as yup from 'yup';

const schema = {
    name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
        errors: [],
    },
    email: {
        type: 'email',
        value: '',
        rules: yup.string()
            .required()
            .email()
            .max(255),
        errors: [],
    },
    password: {
        type: 'password',
        value: '',
        rules: yup.string()
            .required()
            .min(6)
            .max(255),
        errors: [],
    },
    password_confirmation: {
        label: "Confirm Password",
        placeholder: "Confirm your password",
        type: 'password',
        value: '',
        rules: yup.string()
            .required()
            .min(6)
            .max(255),
        errors: [],
    },
};

export default schema;
