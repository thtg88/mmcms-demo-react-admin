import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { getApiErrorMessages } from '../../../helpers/apiErrorMessages';
import {
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../../helpers/formResources';

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
            this.setInputValueState = this.setInputValueState.bind(this);
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
                        creating_resource: true
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

        setInputValueState(name, value) {
            const { resource } = this.state;

            this.setState({
                resource: {
                    ...resource,
                    [name]: {
                        ...resource[name],
                        value,
                    },
                }
            });
        }

        updateInputValue(evt, extra) {
            const { resource_unchanged } = this.state;
            const { label, length, value, target } = evt;

            if(resource_unchanged === true) {
                this.setState({
                    resource_unchanged: false,
                });
            }

            // This means that a monkey-patched React-Select is updating data
            if(extra && extra.action && extra.name) {
                // A single-value selected option
                if(extra.action === 'select-option' && label && value) {
                    this.setInputValueState(extra.name, value);
                }

                // A multiple-value selected option
                else if(extra.action === 'select-option' && typeof length !== 'undefined') {
                    this.setInputValueState(extra.name, evt.map(option => option.value));
                }

                // A multiple value has removed a value
                else if(extra.action === 'remove-value' && typeof length !== 'undefined') {
                    this.setInputValueState(extra.name, evt.map(option => option.value));
                }

                // The value has been cleared
                else if(extra.action === 'clear') {
                    // For a multiple select, we set the value to an empty array
                    if(extra.multiple) {
                        this.setInputValueState(extra.name, []);
                    }

                    // For a single select, we set it to null
                    else {
                        this.setInputValueState(extra.name, null);
                    }
                }
            } else {
                this.setInputValueState(target.name, target.value);
            }
        }

        componentDidUpdate(prevProps) {
            const {
                created,
                errors,
                history,
                resource,
            } = this.props;

            // If I am receiving errors and I am creating the resource
            // Set the creating resource to false
            if(errors.length !== 0 && this.state.creating_resource === true) {
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

        return {
            created,
            errors,
            token,
            resource: typeof resource === 'undefined' ? null : resource,
        };
    };

    const mapDispatchToProps = {
        clearMetadataResourceCreate,
        createResource,
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateHOC);
};

export default withCreateResource;
