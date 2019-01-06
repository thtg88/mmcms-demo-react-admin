import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import {
    getApiErrorMessages,
    isUnauthenticatedError
} from '../../helpers/apiErrorMessages';
import {
    getFormResourceFromValues,
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../helpers/formResources';
import { getResourceFromPaginatedResourcesAndId } from '../../helpers/paginatedResources';
import {
    apiResourceCreateSuccessNotification,
    apiResourceUpdateSuccessNotification
} from '../../helpers/notification';
import { loggedOut } from '../../redux/auth/actions';

const withEditResource = (
    ComponentToWrap,
    {
        clearMetadataResourceEdit,
        destroyResource,
        findResource,
        getPaginatedResources,
        pageSize,
        schema,
        subStateName,
        updateResource,
    }
) => {
    class EditHOC extends Component {
        state = {
            destroying_resource: false,
            getting_resource: false,
            is_modal_open: false,
            resource: null,
            resource_unchanged: true,
            updating_resource: false
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

            const { destroyResource, token } = this.props;
            const { resource } = this.state;
            const data = {
                id: resource.id.value,
                token
            };

            this.setState({
                destroying_resource: true,
            });

            destroyResource({ data });
        }

        async handleUpdateResource(evt) {
            evt.preventDefault();

            const { updateResource, token } = this.props;
            const { resource } = this.state;
            const values = getValuesFromFormResource(resource);
            const validationSchema = getValidationSchemaFromFormResource(resource);
            const data = {
                id: resource.id.value,
                token,
                ...values
            };

            // Reset errors
            this.setState({
                resource: updateFormResourceFromErrors(resource, {inner:[]})
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
                        updating_resource: true
                    });

                    updateResource({ data });
                })
                .catch((errors) => {
                    // If validation does not passes
                    // Set errors in the form
                    this.setState({
                        resource: updateFormResourceFromErrors(resource, errors)
                    });
                });
        }

        toggleDestroyResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                is_modal_open: !this.state.is_modal_open
            })
        }

        updateInputValue(evt) {
            if(this.state.resource_unchanged === true) {
                this.setState({
                    resource_unchanged: false,
                });
            }

            this.setState({
                resource: {
                    ...this.state.resource,
                    [evt.target.name]: {
                        ...this.state.resource[evt.target.name],
                        value: evt.target.value
                    },
                }
            });
        }

        componentDidMount() {
            const {
                created,
                findResource,
                getPaginatedResources,
                match,
                resource,
                token
            } = this.props;

            // console.log(resource);

            // If resource is already in global state
            // Avoid re-fetching
            if(resource === null) {
                const data = {
                    token,
                    id: match.params.id
                };

                this.setState({
                    getting_resource: true
                });

                findResource({ data });

            } else {
                this.setState({ resource: getFormResourceFromValues(resource, schema) });
            }

            // Get all the resources in the background
            // so that when the user goes back to the list
            // he can see the latest changes
            if(created === true) {
                apiResourceCreateSuccessNotification({});

                const data = {
                    token,
                    page: 1,
                    pageSize
                };
                getPaginatedResources({ data });
            }
        }

        componentDidUpdate(prevProps) {
            const {
                destroyed,
                errors,
                loggedOut,
                resource,
                unauthenticated,
                updated
            } = this.props;
            const { destroying_resource, updating_resource } = this.state;

            // if unauthenticated redirect to login
            if(prevProps.unauthenticated === false && unauthenticated === true) {
                loggedOut();
            }

            // This means that I was destroying the resource,
            // And I received a destroyed from the store
            // So restore the state  - this will trigger a re-render
            // which will redirect us to the index
            else if(
                typeof errors !== 'undefined'
                && typeof errors.length !== 'undefined'
                && errors.length === 0
                && destroying_resource === true
                && destroyed === true
            ) {
                this.setState({
                    destroying_resource: false,
                    is_modal_open: false
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
                    updating_resource: false
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
                    updating_resource: false
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
                    is_modal_open: false
                });
            }

            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            else if(resource !== null && prevProps.resource === null) {
                this.setState({
                    resource: getFormResourceFromValues(resource, schema),
                    getting_resource: false,
                    updating_resource: false
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
        const {
            created,
            destroyed,
            error,
            resources,
            updated
        } = state[subStateName];
        const errors = getApiErrorMessages(error);
        const unauthenticated = isUnauthenticatedError(error);
        const params_id = parseInt(ownProps.match.params.id, 10);
        let { resource } = state[subStateName];

        if(
            resource === null
            || typeof resource === 'undefined'
            || resource.id !== params_id
        ) {
            resource = getResourceFromPaginatedResourcesAndId(resources, params_id);
        }

        return {
            created: created,
            destroyed: destroyed,
            errors: errors,
            resource: typeof resource === 'undefined' ? null : resource,
            token: state.auth.token,
            unauthenticated: unauthenticated,
            updated: updated
        };
    };

    const mapDispatchToProps = {
        clearMetadataResourceEdit,
        destroyResource,
        findResource,
        getPaginatedResources,
        loggedOut,
        updateResource
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditHOC);
};

export default withEditResource;
