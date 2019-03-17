import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { animateScroll as scroll } from 'react-scroll';
import { getApiErrorMessages } from '../../helpers/apiErrorMessages';
import { getSelectOptions } from '../../helpers/formResources';
import {
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../helpers/formResources';

const withCreateResource = ({
    clearMetadataResourceCreate,
    createResource,
    resourceBaseRoute,
    schema,
    reducerName,
}) => (ComponentToWrap) => {
    // We loop all the schema entries,
    // in order to get valuesFetchers from them
    // These will allow us to dispatch Redux actions,
    // Which ultimately will allow us to update the schema with the transformed
    // resources returned
    // This is mainly used to populate select values with data coming from the API
    const valuesFetchers = Object.entries(schema)
        .filter(([name, params], idx) => typeof params.valuesFetcher !== 'undefined')
        .map(([name, params], idx) => ({...params.valuesFetcher, name: name}));

    class CreateHOC extends Component {
        state = {
            resource: schema,
            resourceUnchanged: true,
            creating_resource: false
        };

        constructor(props) {
            super(props);

            this.forceUpdateSchema = this.forceUpdateSchema.bind(this);
            this.handleCreateResource = this.handleCreateResource.bind(this);
            this.setInputValueState = this.setInputValueState.bind(this);
            this.updateInputValue = this.updateInputValue.bind(this);
        }

        forceUpdateSchema() {
            this.setState({
                resource: schema,
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
            if(this.state.resourceUnchanged === true) {
                this.setState({
                    resourceUnchanged: false,
                });
            }

            // This means that a monkey-patched React-Select is updating data
            if(extra && extra.action && extra.name) {

                // A single-value selected option
                if(extra.action === 'select-option' && evt.label && evt.value) {
                    this.setInputValueState(extra.name, evt.value);
                }

                // A multiple-value selected option
                else if(extra.action === 'select-option' && typeof evt.length !== 'undefined') {
                    this.setInputValueState(extra.name, evt.map(option => option.value));
                }

                // A multiple value has removed a value
                else if(extra.action === 'remove-value' && typeof evt.length !== 'undefined') {
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
                this.setInputValueState(evt.target.name, evt.target.value);
            }
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
                resource: updateFormResourceFromErrors(resource, {inner:[]})
            });

            await yup.object(validationSchema)
                .validate(
                    values,
                    { abortEarly: false }
                )
                .then(() => {
                    // If validation passes
                    // Create resource
                    scroll.scrollToTop();

                    this.setState({
                        creating_resource: true
                    });

                    createResource({ data });
                })
                .catch((errors) => {
                    // If validation does not passes
                    // Set errors in the form
                    this.setState({
                        resource: updateFormResourceFromErrors(resource, errors)
                    });
                });
        }

        componentDidMount() {
            const { token } = this.props;

            // We loop the valuesFetchers from the schema
            // In order to check if we had resources in state,
            // If not we re-fetch them
            valuesFetchers.forEach((valuesFetcher, idx) => {
                if(
                    !this.props[valuesFetcher.reducerName]
                    || this.props[valuesFetcher.reducerName].length === 0
                ) {
                    // If there are no this.props[valuesFetcher.reducerName]
                    // We re-fetch them
                    const data = {
                        token,
                    };

                    this.setState({
                        [`fetching_${valuesFetcher.reducerName}`]: true,
                    });

                    this.props[valuesFetcher.fetcherName]({ data });

                    // While we fetch them, we disable the input
                    // to give a visual feedback to the user
                    schema[valuesFetcher.name].disabled = true;

                } else {
                    // Otherwise we get them from state and update the schema,
                    schema[valuesFetcher.name].values = getSelectOptions(
                        this.props[valuesFetcher.reducerName],
                        schema[valuesFetcher.name].selectOptionText,
                        schema[valuesFetcher.name].selectOptionValue
                    );

                    // This function triggers a setState,
                    // Which will re-render the component with the updated schema
                    this.forceUpdateSchema();
                }
            });
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

            // We loop the valuesFetchers from the schema
            // In order to check if we had resources or errors coming back
            // so we can update the schema
            valuesFetchers.forEach(valuesFetcher => {
                // If I was fetching this.state[`fetching_${valuesFetcher.reducerName}`],
                // and they have come back,
                // We reset the fetching state
                // And we update the schema
                if(
                    this.state[`fetching_${valuesFetcher.reducerName}`] === true
                    && prevProps[valuesFetcher.reducerName].length === 0
                    && this.props[valuesFetcher.reducerName].length > 0
                ) {
                    schema[valuesFetcher.name].values = getSelectOptions(
                        this.props[valuesFetcher.reducerName],
                        schema[valuesFetcher.name].selectOptionText,
                        schema[valuesFetcher.name].selectOptionValue
                    );
                    schema[valuesFetcher.name].disabled = false;

                    // This function triggers a setState,
                    // Which will re-render the component with the updated schema
                    this.forceUpdateSchema();

                    this.setState({
                        [`fetching_${valuesFetcher.reducerName}`]: false,
                    });
                }

                // If I was fetching this.state[`fetching_${valuesFetcher.reducerName}`],
                // and errors have come back,
                // We reset the fetching state
                else if(
                    this.state[`fetching_${valuesFetcher.reducerName}`] === true
                    && this.props[`${valuesFetcher.reducerName}Errors`].length > 0
                ) {
                    this.setState({
                        [`fetching_${valuesFetcher.reducerName}`]: false,
                    });
                }
            });
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
                    forceUpdateSchema={this.forceUpdateSchema}
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
        } = state[reducerName];
        const errors = getApiErrorMessages(error);

        const newProps = {
            created,
            errors,
            token,
            resource: typeof resource === 'undefined' ? null : resource,
        };

        // We loop the valuesFetchers from the schema
        // So we can add for each one of them additional resources and errors props
        valuesFetchers.forEach(valuesFetcher => {
            newProps[valuesFetcher.reducerName] = state[valuesFetcher.reducerName].resources;
            newProps[`${valuesFetcher.reducerName}Errors`] = getApiErrorMessages(
                state[valuesFetcher.reducerName].error
            );
        });

        return newProps;
    };

    const mapDispatchToProps = {
        clearMetadataResourceCreate,
        createResource,
    };

    // We add additional dispatch actions for each valuesFetcher from the schema
    valuesFetchers.forEach(valuesFetcher => {
        mapDispatchToProps[valuesFetcher.fetcherName] = valuesFetcher.fetcher;
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateHOC);
};

export default withCreateResource;
