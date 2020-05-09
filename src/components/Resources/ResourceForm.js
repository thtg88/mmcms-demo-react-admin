import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import FormGroups from '../FormGroups';
import { getFormGroupsFromSchema } from '../../helpers/formResources';

const ResourceForm = ({
    createButtonIconClassName,
    dispatchedValuesSearchers,
    formSchema,
    isRecovering,
    onCKEditorImageUpload,
    onInputChange,
    onSubmit,
    submitButtonClassName,
    submitButtonDisabled,
    submitButtonIconClassName,
    submitButtonText,
}) => {
    const formGroups = getFormGroupsFromSchema(
        formSchema,
        onInputChange,
        isRecovering,
        onCKEditorImageUpload,
        dispatchedValuesSearchers
    );
    const isAllDisabled = formGroups.filter(
        (formGroup) => formGroup.disabled === true
    ).length === formGroups.length;

    return (
        <Form onSubmit={onSubmit}>
            <FormGroups groups={formGroups} />
            {
                isAllDisabled === true
                    ? null
                    : (
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
                    )
            }
        </Form>
    );
}

ResourceForm.propTypes = {
    createButtonIconClassName: PropTypes.string,
    formSchema: PropTypes.object,
    isRecovering: PropTypes.bool,
    onCKEditorImageUpload: PropTypes.func,
    onInputChange: PropTypes.func,
    onSubmit: PropTypes.func,
    submitButtonClassName: PropTypes.string,
    submitButtonDisabled: PropTypes.bool,
    submitButtonIconClassName: PropTypes.string,
    submitButtonText: PropTypes.string,
};

export default ResourceForm;
