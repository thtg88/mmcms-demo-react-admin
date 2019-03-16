import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { getApiErrorMessages } from '../../../helpers/apiErrorMessages';
import {
    getFormResourceFromValues,
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../../helpers/formResources';
import { getResourceFromPaginatedResourcesAndId } from '../../../helpers/paginatedResources';
import {
    apiResourceCreateSuccessNotification,
    apiResourceUpdateSuccessNotification,
} from '../../../helpers/toastNotification';

const withEditResource = ({
    attributesToShow,
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    pageSize,
    schema,
    subStateName,
    updateResource,
}) => (ComponentToWrap) => {
    class EditHOC extends Component {
        state = {
            destroying_resource: false,
            getting_resource: false,
            is_modal_open: false,
            resource: null,
            resource_unchanged: true,
            updating_resource: false,
        };

        constructor(props) {
            super(props);

            this.handleDestroyResource = this.handleDestroyResource.bind(this);
            this.handleUpdateResource = this.handleUpdateResource.bind(this);
            this.toggleDestroyResourceModal = this.toggleDestroyResourceModal.bind(this);
            this.updateInputValue = this.updateInputValue.bind(this);
        }

        handleDestroyResource(evt) {
            evt.preventDefault();

            const { destroyResource, token, urlResourceId } = this.props;
            const data = {
                token,
                id: urlResourceId,
            };

            this.setState({
                destroying_resource: true,
            });

            destroyResource({ data });
        }

        async handleUpdateResource(evt) {
            evt.preventDefault();

            const { updateResource, token, urlResourceId } = this.props;
            const { resource } = this.state;
            const values = getValuesFromFormResource(resource);
            const validationSchema = getValidationSchemaFromFormResource(resource);
            const data = {
                token,
                id: urlResourceId,
                ...values,
            };

            // Reset errors
            this.setState({
                resource: updateFormResourceFromErrors(resource, {inner:[]}),
            });

            await yup.object(validationSchema)
                .validate(
                    values,
                    { abortEarly: false }
                )
                .then(() => {
                    // If validation passes
                    // Update resource

                    this.setState({
                        updating_resource: true,
                    });

                    updateResource({ data });
                })
                .catch((errors) => {
                    // If validation does not passes
                    // Set errors in the form
                    this.setState({
                        resource: updateFormResourceFromErrors(resource, errors),
                    });
                });
        }

        toggleDestroyResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                is_modal_open: !this.state.is_modal_open,
            })
        }

        updateInputValue(evt) {
            const { resource, resource_unchanged } = this.state;
            const { target } = evt;

            if(resource_unchanged === true) {
                this.setState({
                    resource_unchanged: false,
                });
            }

            this.setState({
                resource: {
                    ...resource,
                    [target.name]: {
                        ...resource[target.name],
                        value: target.value
                    },
                },
            });
        }

        componentDidMount() {
            const {
                created,
                findResource,
                getPaginatedResources,
                resource,
                token,
                urlResourceId,
            } = this.props;

            // If resource is already in global state
            // Avoid re-fetching
            if(resource === null) {
                const data = {
                    token,
                    id: urlResourceId,
                };

                this.setState({
                    getting_resource: true,
                });

                findResource({ data });

            } else {
                this.setState({
                    resource: getFormResourceFromValues(resource, schema, attributesToShow),
                });
            }

            // Get all the paginated_resources in the background
            // so that when the user goes back to the list
            // he can see the latest changes
            if(created === true) {
                apiResourceCreateSuccessNotification({});

                const data = {
                    token,
                    pageSize,
                    page: 1,
                };
                getPaginatedResources({ data });
            }
        }

        componentDidUpdate(prevProps) {
            const {
                destroyed,
                errors,
                resource,
                updated,
            } = this.props;
            const { destroying_resource, updating_resource } = this.state;

            // This means that I was destroying the resource,
            // And I received a destroyed from the store
            // So restore the state  - this will trigger a re-render
            // which will redirect us to the index
            if(
                typeof errors !== 'undefined'
                && typeof errors.length !== 'undefined'
                && errors.length === 0
                && destroying_resource === true
                && destroyed === true
            ) {
                this.setState({
                    destroying_resource: false,
                    is_modal_open: false,
                });
            }

            // This means that I was updating the resource,
            // And I received errors from the store
            // So it's time to restore the Update button
            else if(
                updating_resource === true
                && typeof errors.length !== 'undefined'
                && errors.length !== 0
            ) {
                this.setState({
                    getting_resource: false,
                    updating_resource: false,
                });
            }

            // This means that I was updating the resource,
            // And I received an updated from the store
            // So it's time to restore the Update button
            else if(
                updating_resource === true
                && updated === true
            ) {
                apiResourceUpdateSuccessNotification({});

                this.setState({
                    getting_resource: false,
                    updating_resource: false,
                });
            }

            // This means that if I was destroying the resource,
            // And I have errors,
            // close the modal and show them
            else if(
                typeof errors !== 'undefined'
                && typeof errors.length !== 'undefined'
                && errors.length > 0
                && destroying_resource === true
            ) {
                this.setState({
                    destroying_resource: false,
                    is_modal_open: false,
                });
            }

            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            else if(resource !== null && prevProps.resource === null) {
                this.setState({
                    resource: getFormResourceFromValues(resource, schema, attributesToShow),
                    getting_resource: false,
                    updating_resource: false,
                });
            }
        }

        componentWillUnmount() {
            const { clearMetadataResourceEdit } = this.props;

            if(typeof clearMetadataResourceEdit !== 'undefined') {
                clearMetadataResourceEdit();
            }
        }

        render() {
            return (
                <ComponentToWrap
                    handleDestroyResource={this.handleDestroyResource}
                    handleUpdateResource={this.handleUpdateResource}
                    toggleDestroyResourceModal={this.toggleDestroyResourceModal}
                    updateInputValue={this.updateInputValue}
                    {...this.props}
                    {...this.state}
                />
            );
        }
    }

    const mapStateToProps = (state, ownProps) => {
        const { token } = state.auth;
        const {
            created,
            destroyed,
            error,
            paginated_resources,
            updated,
        } = state[subStateName];
        const errors = getApiErrorMessages(error);
        const urlResourceId = parseInt(ownProps.match.params.id, 10);
        let { resource } = state[subStateName];

        if(
            resource === null
            || typeof resource === 'undefined'
            || resource.id !== urlResourceId
        ) {
            resource = getResourceFromPaginatedResourcesAndId(paginated_resources, urlResourceId);
        }

        return {
            created,
            destroyed,
            errors,
            token,
            updated,
            urlResourceId,
            resource: typeof resource === 'undefined' ? null : resource,
        };
    };

    const mapDispatchToProps = {
        clearMetadataResourceEdit,
        destroyResource,
        findResource,
        getPaginatedResources,
        updateResource,
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditHOC);
};

export default withEditResource;
