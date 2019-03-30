import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { animateScroll as scroll } from 'react-scroll';
import { getApiErrorMessages } from '../../../helpers/apiErrorMessages';
import {
    filterSchemaFromAttributes,
    getSelectOptions,
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../../helpers/formResources';
import slugify from '../../../helpers/slugify';
import { apiResourceCreateSuccessNotification } from '../../../helpers/toastNotification';
import {
    createResource as createImage,
    // destroyResource as destroyImage,
    reducerName as imageReducerName,
    updateResource as updateImage,
} from '../../../redux/images/actions';

const { REACT_APP_API_BASE_URL } = process.env;

const withCreateResource = ({
    attributesSequenceToShow,
    clearMetadataResourceCreate,
    createResource,
    nameField,
    resourceBaseRoute,
    resourceTableName,
    reducerName,
    schema,
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
            creating_resource: false,
            imageUploadRejectPromise: null,
            imageUploadResolvePromise: null,
            resource: filterSchemaFromAttributes(schema, attributesSequenceToShow),
            resourceUnchanged: true,
            toUpdateImages: [],
        };

        constructor(props) {
            super(props);

            this.forceUpdateSchema = this.forceUpdateSchema.bind(this);
            this.handleCKEditorImageFileUpload = this.handleCKEditorImageFileUpload.bind(this);
            this.handleCreateResource = this.handleCreateResource.bind(this);
            this.setInputValueState = this.setInputValueState.bind(this);
            this.updateInputValue = this.updateInputValue.bind(this);
        }

        forceUpdateSchema() {
            this.setState({
                resource: filterSchemaFromAttributes(schema, attributesSequenceToShow),
            });
        }

        handleCKEditorImageFileUpload(file, resolvePromise, rejectPromise) {
            const { createImage, token } = this.props;

            this.setState({
                imageUploadResolvePromise: resolvePromise,
                imageUploadRejectPromise: rejectPromise,
            });

            // add/upload file
            const data = {
                token,
                data: file,
                // We are not adding target_id nor target_table
                // As the back-end needs both to be available to set
                // This gets done at a later stage, once the resource gets created
                // And we have their ID, so that those can be updated
                // target_id: urlResourceId,
                // target_table: resourceTableName,
            };
            createImage({ data });
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

        setInputValueState(name, value) {
            const { resource, resourceUnchanged } = this.state;
            const newValue = {
                resource: {
                    ...resource,
                    [name]: {
                        ...resource[name],
                        value,
                    },
                },
            };

            // We update the slug if it's the nameField
            // and there is a slug available in the schema
            if(name !== 'slug' && name === nameField && resource.slug) {
                newValue.resource.slug = {
                    ...resource.slug,
                    value: slugify(value),
                };
            }

            // Please don't split this set state into 2 separate ones,
            // As doing so may introduce slightly odd bugs on CKEditor implementation
            // Where 2 state updates in succession may fire the update with the old value
            if(resourceUnchanged === true) {
                // If the resource has not been changed
                // We set the state to cater for that
                this.setState({
                    ...newValue,
                    resourceUnchanged: false,
                });
            } else {
                // Otherwise we simply set the new value
                this.setState({
                    ...newValue,
                });
            }
        }

        updateInputValue(evt, extra) {
            // This means that a monkey-patched React-Select is updating data
            if(extra && extra.action && extra.name) {

                // A single-value selected option
                if(extra.action === 'select-option' && evt.label && evt.value) {
                    this.setInputValueState(extra.name, evt.value);
                }

                // A multiple-value selected option
                else if(extra.action === 'select-option' && typeof evt.length !== 'undefined') {
                    this.setInputValueState(extra.name, evt.map(option => {
                        return option.value;
                    }));
                }

                // A multiple value has removed a value
                else if(extra.action === 'remove-value' && typeof evt.length !== 'undefined') {
                    this.setInputValueState(extra.name, evt.map(option => {
                        return option.value;
                    }));
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

        componentDidMount() {
            const { token } = this.props;

            if(valuesFetchers.length > 0) {
                // We loop the valuesFetchers from the schema
                // In order to check if we had resources in state,
                // If not we re-fetch them
                valuesFetchers.forEach((valuesFetcher, idx) => {
                    if(
                        !this.props[valuesFetcher.reducerName].resources
                        || this.props[valuesFetcher.reducerName].resources.length === 0
                    ) {
                        // If there are no this.props[valuesFetcher.reducerName]
                        // We re-fetch them
                        const data = {
                            token,
                        };
                        this.props[valuesFetcher.fetcherName]({ data });

                        // While we fetch them, we disable the input
                        // to give a visual feedback to the user
                        schema[valuesFetcher.name].disabled = true;

                    } else {
                        // Otherwise we get them from state and update the schema,
                        schema[valuesFetcher.name].values = getSelectOptions(
                            this.props[valuesFetcher.reducerName].resources,
                            schema[valuesFetcher.name].selectOptionText,
                            schema[valuesFetcher.name].selectOptionValue
                        );
                    }
                });

                // This function triggers a setState,
                // Which will re-render the component with the updated schema
                this.forceUpdateSchema();
            }
        }

        componentDidUpdate(prevProps) {
            const {
                created,
                errors,
                history,
                image,
                imageCreated,
                imageErrors,
                resource,
                token,
                updateImage,
            } = this.props;
            const {
                toUpdateImages,
                imageUploadRejectPromise,
                imageUploadResolvePromise,
            } = this.state;

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
                // check if component has images to update,
                // if so fire off requests to update those images
                // with the created resource's id and table name
                toUpdateImages.forEach(image => {
                    const data = {
                        token,
                        id: image.id,
                        target_id: resource.id,
                        target_table: resourceTableName,
                    };
                    updateImage({ data });
                });

                history.push('/'+resourceBaseRoute+'/'+resource.id);
            }

            // This means that if I was creating the image,
            // And I have errors,
            // so we set all image categories uploading to false
            else if(
                (
                    !prevProps.imageErrors
                    || !prevProps.imageErrors.length
                )
                && imageErrors
                && imageErrors.length
                && imageErrors.length > 0
            ) {
                if(imageUploadRejectPromise) {
                    imageUploadRejectPromise(imageErrors.join('. '));

                    this.setState({
                        imageUploadRejectPromise: null,
                    });
                }
            }

            // This means we were creating an image
            // and it's been created correctly
            // So we append it to the existing images array
            // and we set all image categories uploading to false
            else if(prevProps.imageCreated === false && imageCreated === true) {
                apiResourceCreateSuccessNotification({
                    resourceDisplayName: 'Image',
                    iconClassName: 'fa-image',
                });

                if(imageUploadResolvePromise) {
                    imageUploadResolvePromise({
                        default: `${REACT_APP_API_BASE_URL}${image.url}`,
                    });

                    this.setState({
                        imageUploadResolvePromise: null,
                        toUpdateImages: [
                            ...toUpdateImages,
                            {...image},
                        ],
                    });
                }
            }

            let forceUpdateSchema = false;

            if(valuesFetchers.length > 0) {
                // We loop the valuesFetchers from the schema
                // In order to check if we had resources or errors coming back
                // so we can update the schema
                valuesFetchers.forEach(valuesFetcher => {
                    // If I was fetching this.props[`${valuesFetcher.reducerName}`].fetching_resources,
                    // and they have come back,
                    // We update the schema
                    if(
                        prevProps[`${valuesFetcher.reducerName}`].fetching_resources === true
                        && this.props[`${valuesFetcher.reducerName}`].fetching_resources === false
                    ) {
                        schema[valuesFetcher.name].values = getSelectOptions(
                            this.props[valuesFetcher.reducerName].resources,
                            schema[valuesFetcher.name].selectOptionText,
                            schema[valuesFetcher.name].selectOptionValue
                        );
                        schema[valuesFetcher.name].disabled = false;

                        forceUpdateSchema = true;
                    }
                });

                if(forceUpdateSchema === true) {
                    // This function triggers a setState,
                    // Which will re-render the component with the updated schema
                    this.forceUpdateSchema();
                }
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
                    forceUpdateSchema={this.forceUpdateSchema}
                    handleCKEditorImageFileUpload={this.handleCKEditorImageFileUpload}
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

        // Get images data
        const imageCreated = state[imageReducerName].created;
        // const imageDestroyed = state[imageReducerName].destroyed;
        const image = state[imageReducerName].resource;
        const imageError = state[imageReducerName].error;
        const imageErrors = getApiErrorMessages(imageError);

        const newProps = {
            created,
            errors,
            image,
            imageCreated,
            // imageDestroyed,
            imageErrors,
            token,
            resource: typeof resource === 'undefined' ? null : resource,
        };

        // We loop the valuesFetchers from the schema
        // So we can add for each one of them additional resources and errors props
        valuesFetchers.forEach(valuesFetcher => {
            newProps[valuesFetcher.reducerName] = {};
            newProps[valuesFetcher.reducerName].fetching_resources = state[valuesFetcher.reducerName].fetching_resources;
            newProps[valuesFetcher.reducerName].resources = state[valuesFetcher.reducerName].resources;
            newProps[`${valuesFetcher.reducerName}`].errors = getApiErrorMessages(
                state[valuesFetcher.reducerName].error
            );
        });

        return newProps;
    };

    const mapDispatchToProps = {
        clearMetadataResourceCreate,
        createImage,
        createResource,
        updateImage,
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
