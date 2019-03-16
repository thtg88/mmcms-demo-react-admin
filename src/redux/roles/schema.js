import * as yup from 'yup';

export const canDestroy = true;

export const schema = {
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

export const attributesSequenceToShow = [
    'display_name',
    'name',
    'priority',
];

export default schema;
