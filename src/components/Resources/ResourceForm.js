import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import FormGroups from '../FormGroups';
import { getFormGroupsFromResource } from '../../helpers/formResources';

const ResourceForm = ({
    createButtonIconClassName,
    disabled,
    isRecovering,
    onCKEditorImageUpload,
    onInputChange,
    onSubmit,
    resource,
    submitButtonClassName,
    submitButtonDisabled,
    submitButtonIconClassName,
    submitButtonText,
}) => {
    const formGroups = getFormGroupsFromResource(
        resource,
        onInputChange,
        isRecovering,
        onCKEditorImageUpload
    );

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
    isRecovering: PropTypes.bool,
    onCKEditorImageUpload: PropTypes.func,
    onInputChange: PropTypes.func,
    onSubmit: PropTypes.func,
    resource: PropTypes.object,
    submitButtonClassName: PropTypes.string,
    submitButtonDisabled: PropTypes.bool,
    submitButtonIconClassName: PropTypes.string,
    submitButtonText: PropTypes.string,
};

export default ResourceForm;
