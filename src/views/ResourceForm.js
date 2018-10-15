import React from 'react';
import {
    Button,
    Form,
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
                Object.entries(resource).map((formElement, idx) => {
                    const name = formElement[0];
                    const params = formElement[1];
                    const disabled = params.disabled
                        ? params.disabled
                        : false;
                    const label = params.label
                        ? params.label
                        : name.charAt(0).toUpperCase()+name.substr(1).replace('_', ' ');
                    const placeholder = params.placeholder
                        ? params.placeholder
                        : `Enter your ${label}`;
                    const type = params.type
                        ? params.type
                        : "text";

                    // console.log(name.indexOf('_id') === name.length - 3, typeof params.value);

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
                            />
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

export default ResourceForm;
