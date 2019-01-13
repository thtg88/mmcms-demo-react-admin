import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import {
    getApiErrorMessages,
    isUnauthenticatedError
} from '../../helpers/apiErrorMessages';
import {
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../helpers/formResources';
import { loggedOut } from '../../redux/auth/actions';

const withCreateResource = (
    ComponentToWrap,
    {
        clearMetadataResourceCreate,
        createResource,
        resourceBaseRoute,
        schema,
        subStateName,
    }
) => {
    class CreateHOC extends Component {
        state = {
            creating_resource: false,
            resource: schema,
            resource_unchanged: true,
        };

        constructor(props) {
            super(props);

            this.handleCreateResource = this.handleCreateResource.bind(this);
            this.updateInputValue = this.updateInputValue.bind(this);
        }

        async handleCreateResource(evt) {
            evt.preventDefault();

            const { createResource, token } = this.props;
            const { resource } = this.state;
            const values = getValuesFromFormResource(resource);
            const validationSchema = getValidationSchemaFromFormResource(resource);
            const data = { token, ...values };

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
                    // Create resource

                    this.setState({
                        creating_resource: true,
                    });

                    createResource({ data });
                })
                .catch((errors) => {
                    // If validation does not passes
                    // Set errors in the form
                    this.setState({
                        resource: updateFormResourceFromErrors(resource, errors),
                    });
                });
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

        componentDidUpdate(prevProps) {
            const {
                created,
                errors,
                history,
                loggedOut,
                resource,
                unauthenticated,
            } = this.props;

            // if unauthenticated redirect to login
            if(prevProps.unauthenticated === false && unauthenticated === true) {
                loggedOut();
            }

            // If I am receiving errors and I am creating the resource
            // Set the creating resource to false
            else if(errors.length !== 0 && this.state.creating_resource === true) {
                this.setState({
                    creating_resource: false,
                });
            }

            // If received created=true and resource id is there
            // Redirect to resource edit
            else if(
                prevProps.created !== true
                && created === true
                && typeof resource.id !== 'undefined'
            ) {
                history.push('/'+resourceBaseRoute+'/'+resource.id);
            }
        }

        componentWillUnmount() {
            const { clearMetadataResourceCreate } = this.props;

            if(typeof clearMetadataResourceCreate !== 'undefined') {
                clearMetadataResourceCreate();
            }
        }

        render() {
            return (
                <ComponentToWrap
                    handleCreateResource={this.handleCreateResource}
                    updateInputValue={this.updateInputValue}
                    {...this.props}
                    {...this.state}
                />
            );
        }
    }

    const mapStateToProps = state => {
        const { token } = state.auth;
        const {
            created,
            error,
            resource
        } = state[subStateName];
        const errors = getApiErrorMessages(error);
        const unauthenticated = isUnauthenticatedError(error);

        return {
            created,
            errors,
            token,
            unauthenticated,
            resource: typeof resource === 'undefined' ? null : resource,
        };
    };

    const mapDispatchToProps = {
        clearMetadataResourceCreate,
        createResource,
        loggedOut,
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateHOC);
};

export default withCreateResource;
