import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ResourceForm from '../../ResourceForm';
import { withCreateResourceCallback } from '../../../Resources/CreateResource';
// import {
//     clearMetadataResourceCreate,
//     createResource,
// } from '../../../../redux/productCategoryNewsArticles/actions';

class CreateForm extends Component {
    componentDidMount() {
        const {
            parentResource,
            relationshipParentIdColumn,
            updateInputValue
        } = this.props;

        // On mount we set the parentRelationshipIdColumn to the value coming from the parentResource
        updateInputValue({
            target: {
                name: relationshipParentIdColumn,
                value: parentResource.id,
            },
        });
    }

    componentDidUpdate(prevProps) {
        const {
            created,
            relationshipName,
            resource,
            setRelationshipItem,
        } = this.props;

        // If received created=true and resource id is there
        // Redirect to resource edit
        if(
            prevProps.created !== true
            && created === true
            && typeof resource.id !== 'undefined'
        ) {
            const data = {
                relationshipName,
                item: {...resource},
            };
            setRelationshipItem({ data });
        }
    }

    render() {
        const {
            creatingResource,
            dispatchedValuesSearchers,
            formSchema,
            handleCKEditorImageFileUpload,
            handleCKEditorFileUpload,
            handleCreateResource,
            resourceUnchanged,
            updateInputValue,
        } = this.props;
        const createButtonIconClassName = creatingResource === true
            ? 'fa fa-spinner fa-spin'
            : 'fa fa-link';

        return (
            <>
                <h5>Associate a New Category</h5>
                <ResourceForm
                    dispatchedValuesSearchers={dispatchedValuesSearchers}
                    formSchema={formSchema}
                    onCKEditorImageUpload={handleCKEditorImageFileUpload}
                    onCKEditorFileUpload={handleCKEditorFileUpload}
                    onInputChange={updateInputValue}
                    onSubmit={handleCreateResource}
                    submitButtonClassName="success"
                    submitButtonDisabled={resourceUnchanged || creatingResource}
                    submitButtonIconClassName={createButtonIconClassName}
                    submitButtonText="Associate"
                />
            </>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    setRelationshipItem: ownProps.setRelationshipItem,
});

export default connect(() => ({}), mapDispatchToProps)(withRouter(
    withCreateResourceCallback(
        (ownProps) => ({
            attributesSequenceToShow: ownProps.childAttributesSequenceToShow,
            clearMetadataResourceCreate: ownProps.clearMetadataResourceCreate,
            createResource: ownProps.createChildResource,
            dontRedirectAfterCreate: true,
            nameField: ownProps.childNameField,
            reducerName: ownProps.reducerName,
            resourceBaseRoute: ownProps.childResourceBaseRoute,
            resourceDisplayName: ownProps.resourceDisplayName,
            schema: ownProps.childSchema,
        })
    )(CreateForm)
));
