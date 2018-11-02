import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

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
    return (
        <Form onSubmit={onSubmit}>
            {
                Object.entries(resource).map(([name, params], idx) => {
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

                    if(
                        name === 'id'
                        || name.indexOf('_id') === name.length - 3
                        || typeof params.value === 'object'
                    ) {
                        // TODO we skip momentarily ids as we do not have
                        // a handler for selects yet
                        // We also skip objects as we do not have any way of rendering them
                        return (
                            null
                        );
                    }

                    return (
                        <FormGroup key={name}>
                            <Label htmlFor={name}>{label}</Label>
                            <Input
                                type={type}
                                id={name}
                                name={name}
                                value={params.value}
                                disabled={disabled}
                                placeholder={placeholder}
                                onChange={onInputChange}
                                invalid={params.errors.length > 0}
                            />
                            {
                                params.errors.length
                                ? <FormFeedback>{params.errors.join('. ')}</FormFeedback>
                                : null
                            }
                        </FormGroup>
                    );
                })
            }
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
