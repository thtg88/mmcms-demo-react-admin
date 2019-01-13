import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import FormGroups from '../FormGroups';

const ResourceForm = ({
    createButtonIconClassName,
    disabled,
    onInputChange,
    onSubmit,
    resource,
    submitButtonClassName,
    submitButtonDisabled,
    submitButtonIconClassName,
    submitButtonText,
}) => {
    const formGroups = Object.entries(resource).filter(([name, params], idx) => {
        if(
            // We skip everything that's not undefined
            typeof resource[name] === 'undefined'
            // we skip id
            || name === 'id'
        ) {
            return false;
        }

        if(typeof params.value === 'object' && params.value !== null && typeof params.value.length === 'undefined') {
            // We skip objects as we do not have any way of rendering them
            // But we do not skip arrays as we might need them for multiple selects
            // hence the typeof params.value.length === 'undefined'
            return false;
        }

        return true;

    }).map(([name, params], idx) => {
        const disabled = params.disabled
            ? params.disabled
            : false;
        const label = params.label
            ? params.label
            : name.charAt(0).toUpperCase()+name.substr(1).replace('_', ' ');
        const placeholder = params.placeholder
            ? params.placeholder
            : `Enter the ${label}`;
        const type = params.type
            ? params.type
            : "text";
        const value = params.value === null
            ? ''
            : params.value;
        const errors = params.errors
            ? params.errors
            : [];
        const empty_option = params.empty_option
            ? params.empty_option
            : '';
        const values = params.values
            ? params.values
            : [];
        const formText = params.formText
            ? params.formText
            : null;
        const multiple = params.multiple
            ? params.multiple
            : false;

        if(type === 'react-select') {
            // React select wants the full option as a value [sic.]
            const reactSelectValues = multiple === true
                // We extract all the options
                ? values.filter(option => {
                    // value is an array for multiple selects
                    // So we need to check if the option.value is contained in that value(s)
                    return value.indexOf(option.value) > -1;
                })
                // We extract the single option from the multiple select
                : values.filter(option => {
                    return option.value === value;
                });

            const reactSelectValue = multiple === true
                ? [...reactSelectValues]
                : (
                    reactSelectValues.length > 0
                        ? reactSelectValues[0]
                        : null
                );

            return {
                disabled: disabled,
                formFeedback: errors.length ? errors.join('. ') : null,
                key: name,
                invalid: errors.length > 0,
                label: label,
                multiple: multiple,
                name: name,
                onChange: (selectedOption, extra) => onInputChange(selectedOption, {...extra, name, multiple}),
                placeholder: placeholder,
                value: reactSelectValue,
                values: values,
            }
        }

        if(type === 'checkbox') {
            return {
                checked: value === 1,
                className: 'pb-3',
                disabled: disabled,
                formFeedback: errors.length ? errors.join('. ') : null,
                formText: formText,
                invalid: errors.length > 0,
                key: name,
                label: ` ${label}`,
                name: name,
                onChange: onInputChange,
                type: type,
                value: value,
            };
        }

        if(type === 'hidden') {
            return {
                disabled: disabled,
                formText: formText,
                key: name,
                name: name,
                onChange: onInputChange,
                type: type,
                value: value,
            };
        }

        return {
            disabled: disabled,
            emptyOption: empty_option,
            formFeedback: errors.length ? errors.join('. ') : null,
            formText: formText,
            invalid: errors.length > 0,
            key: name,
            label: label,
            multiple: multiple,
            name: name,
            onChange: onInputChange,
            placeholder: placeholder,
            type: type,
            value: value,
            values: values,
        };
    });

    return (
        <Form onSubmit={onSubmit}>
            <FormGroups groups={formGroups} />
            <Button
                type="submit"
                size="md"
                color={submitButtonClassName}
                block
                disabled={submitButtonDisabled}
                onClick={onSubmit}
            >
                <i className={submitButtonIconClassName}></i>
                {' '}
                {submitButtonText}
            </Button>
        </Form>
    );
}

ResourceForm.propTypes = {
    createButtonIconClassName: PropTypes.string,
    disabled: PropTypes.bool,
    onInputChange: PropTypes.func,
    onSubmit: PropTypes.func,
    resource: PropTypes.object,
    submitButtonClassName: PropTypes.string,
    submitButtonDisabled: PropTypes.bool,
    submitButtonIconClassName: PropTypes.string,
    submitButtonText: PropTypes.string,
};

export default ResourceForm;
