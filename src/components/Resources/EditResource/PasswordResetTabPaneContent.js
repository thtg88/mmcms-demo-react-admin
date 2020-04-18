import React from 'react';
import { withRouter } from 'react-router-dom';
import { withEditResource } from '../../../components/Resources/EditResource';
import ResourceForm from '../../../components/Resources/ResourceForm';
import {
    clearMetadataResourceEdit,
    findResource,
    updateResource,
} from '../../../redux/users/actions';
import {
    nameField,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/users/schema';

const attributesSequenceToShow = ['password', 'password_confirmation'];

const PasswordResetTabPaneContent = ({
    handleUpdateResource,
    isRecovering,
    resourceUnchanged,
    updateInputValue,
    updatingResource,
    ...props
}) => {
    const updateButtonIconClassName = updatingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-save';

    return (
        <ResourceForm
            {...props}
            onInputChange={updateInputValue}
            onSubmit={handleUpdateResource}
            submitButtonClassName="warning"
            submitButtonDisabled={isRecovering || resourceUnchanged || updatingResource}
            submitButtonIconClassName={updateButtonIconClassName}
            submitButtonText="Update"
        />
    );
};

export default withRouter(withEditResource({
    attributesSequenceToShow,
    clearMetadataResourceEdit,
    findResource,
    nameField,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
    updateResource,
})(PasswordResetTabPaneContent));
