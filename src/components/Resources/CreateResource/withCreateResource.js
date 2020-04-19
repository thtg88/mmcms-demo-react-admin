import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { animateScroll as scroll } from 'react-scroll';
import withUpdateFormSchema from '../withUpdateFormSchema';
import { getApiErrorMessages } from '../../../helpers/apiMessages';
import {
    getSelectOptions,
    getValidationSchemaFromFormSchema,
    getValuesFromFormSchema,
} from '../../../helpers/formResources';
import { apiResourceCreateSuccessNotification } from '../../../helpers/toastNotification';
import { replaceUrlParameters } from '../../../helpers/url';
import reducerRegistry from '../../../redux/reducerRegistry';
import sagaRegistry from '../../../redux/sagaRegistry';
import {
    createResource as createImage,
    // destroyResource as destroyImage,
    updateResource as updateImage,
} from '../../../redux/images/actions';
import { reducerName as imageReducerName } from '../../../redux/images/schema';

const { REACT_APP_API_BASE_URL } = process.env;

const withCreateResource = ({
    additionalReducers,
    additionalSagas,
    attributesSequenceToShow,
    clearMetadataResourceCreate,
    createResource,
    dontRedirectAfterCreate,
    nameField,
    redirectUrlAfterCreate,
    reducerName,
    reducers,
    resourceBaseRoute,
    resourceDisplayName,
    resourceTableName,
    sagas,
    schema,
}) => (ComponentToWrap) => {
    if(typeof reducers === 'function') {
        reducerRegistry.register(reducerName, reducers);
    }
    if(additionalReducers) {
        Object.entries(additionalReducers).forEach(
            ([additionalReducerName, additionalReducer]) => {
                reducerRegistry.register(
                    additionalReducerName,
                    additionalReducer
                );
            }
        );
    }

    if(sagas) {
        sagaRegistry.register(reducerName, sagas);
    }
    if(additionalSagas) {
        Object.entries(additionalSagas).forEach(
            ([additionalSagaName, additionalSaga]) => {
                sagaRegistry.register(additionalSagaName, additionalSaga);
            }
        );
    }

    // We deep copy schema so we are sure we are working with a fresh copy
    // e.g. no wiriting on old references or for next time we use schema
    const updatedSchema = cloneDeep(schema);

    // We loop all the updatedSchema entries,
    // in order to get valuesFetchers from them
    // These will allow us to dispatch Redux actions,
    // Which ultimately will allow us to update the updatedSchema with the transformed
    // resources returned
    // This is mainly used to populate select values with data coming from the API
    const valuesFetchers = Object.entries(updatedSchema)
        .filter(([name, params], idx) => typeof params.valuesFetcher !== 'undefined')
        .map(([name, params], idx) => ({...params.valuesFetcher, name: name}));

    // We loop all the updatedSchema entries,
    // in order to get valuesSearchers from them
    // These will allow us to dispatch Redux actions,
    // Which ultimately will allow us to update the updatedSchema with the transformed
    // resources returned
    // This is mainly used to populate select values with data coming from the API
    const valuesSearchers = Object.entries(updatedSchema)
        .filter(([name, params], idx) => typeof params.valuesSearcher !== 'undefined')
        .map(([name, params], idx) => ({...params.valuesSearcher, name: name}));

    class CreateHOC extends Component {
        constructor(props) {
            super(props);

            this.handleCKEditorImageFileUpload = this.handleCKEditorImageFileUpload.bind(this);
            this.handleCreateResource = this.handleCreateResource.bind(this);

            this.state = {
                creatingResource: false,
                imageUploadRejectPromise: null,
                imageUploadResolvePromise: null,
                toUpdateImages: [],
                valuesSearcherCallbacks: {},
            };
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

            const {
                createResource,
                formSchema,
                resetFormSchemaErrors,
                setFormSchemaErrors,
                token,
            } = this.props;
            const values = getValuesFromFormSchema(formSchema);
            const validationSchema = getValidationSchemaFromFormSchema(formSchema);
            const data = { token, ...values };

            // Reset errors
            resetFormSchemaErrors();

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
                        creatingResource: true
                    });

                    createResource({ data });
                })
                .catch((errors) => {
                    // If validation does not passes
                    // Set errors in the form
                    setFormSchemaErrors(errors);
                });
        }

        componentDidMount() {
            const {
                formSchema,
                setAllFormSchema,
                token,
            } = this.props;

            if(valuesFetchers.length > 0) {
                // We loop the valuesFetchers from the formSchema
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

                        if(!formSchema[valuesFetcher.name].dontEnable) {
                            // While we fetch them, we disable the input
                            // to give a visual feedback to the user
                            formSchema[valuesFetcher.name].disabled = true;
                        }

                    } else {
                        // Otherwise we get them from state and update the formSchema,
                        formSchema[valuesFetcher.name].values = getSelectOptions(
                            this.props[valuesFetcher.reducerName].resources,
                            formSchema[valuesFetcher.name].selectOptionText,
                            formSchema[valuesFetcher.name].selectOptionValue
                        );
                    }
                });

                // This function triggers a setState,
                // Which will re-render the component with the updated formSchema
                setAllFormSchema(formSchema);
            }
        }

        componentDidUpdate(prevProps) {
            const {
                created,
                errors,
                history,
                formSchema,
                image,
                imageCreated,
                imageErrors,
                resource,
                setAllFormSchema,
                token,
                updateImage,
                urlParams,
            } = this.props;
            const {
                creatingResource,
                imageUploadRejectPromise,
                imageUploadResolvePromise,
                toUpdateImages,
                valuesSearcherCallbacks,
            } = this.state;

            // If I am receiving errors and I am creating the resource
            // Set the creating resource to false
            if(errors.length !== 0 && creatingResource === true) {
                this.setState({
                    creatingResource: false,
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

                apiResourceCreateSuccessNotification({ resourceDisplayName });

                if(!dontRedirectAfterCreate) {
                    if(redirectUrlAfterCreate) {
                        // If redirectUrlAfterCreate is provided
                        // We push to that URL with the parameters replaced

                        // We cast as string as replaceUrlParameters only accept string parameters
                        urlParams.id = resource.id+'';

                        history.push(replaceUrlParameters(redirectUrlAfterCreate, urlParams));
                    } else {
                        history.push('/'+resourceBaseRoute+'/'+resource.id);
                    }
                } else {
                    this.setState({
                        creatingResource: false,
                    });
                }
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

            if(valuesFetchers.length > 0) {
                let forceUpdateSchema = false;

                // We loop the valuesFetchers from the formSchema
                // In order to check if we had resources or errors coming back
                // so we can update the formSchema
                valuesFetchers.forEach(valuesFetcher => {
                    // If I was fetching this.props[`${valuesFetcher.reducerName}`].fetching_resources,
                    // and they have come back,
                    // We update the formSchema
                    if(
                        prevProps[`${valuesFetcher.reducerName}`].fetching_resources === true
                        && this.props[`${valuesFetcher.reducerName}`].fetching_resources === false
                    ) {
                        formSchema[valuesFetcher.name].values = getSelectOptions(
                            this.props[valuesFetcher.reducerName].resources,
                            formSchema[valuesFetcher.name].selectOptionText,
                            formSchema[valuesFetcher.name].selectOptionValue
                        );
                        if(!formSchema[valuesFetcher.name].dontEnable) {
                            formSchema[valuesFetcher.name].disabled = false;
                        }

                        forceUpdateSchema = true;
                    }
                });

                if(forceUpdateSchema === true) {
                    // This function triggers a setState,
                    // Which will re-render the component with the updated formSchema
                    setAllFormSchema(formSchema);
                }
            }

            if(valuesSearchers.length > 0) {
                const newValues = {};
                const newCallbacks = {};

                // We loop the valuesSearchers from the formSchema
                // In order to check if we had resources or errors coming back
                // so we can update the formSchema
                valuesSearchers.forEach(valuesSearcher => {
                    // If I was fetching this.props[`${valuesSearcher.reducerName}`].fetching_resources,
                    // and they have come back,
                    // We update the formSchema
                    if(
                        prevProps[`${valuesSearcher.reducerName}`].fetching_resources === true
                        && this.props[`${valuesSearcher.reducerName}`].fetching_resources === false
                    ) {
                        if(typeof newValues[valuesSearcher.name] === 'undefined') {
                            newValues[valuesSearcher.name] = {};
                        }

                        newValues[valuesSearcher.name].values = getSelectOptions(
                            this.props[valuesSearcher.reducerName].resources,
                            formSchema[valuesSearcher.name].selectOptionText,
                            formSchema[valuesSearcher.name].selectOptionValue
                        );
                        if(!formSchema[valuesSearcher.name].dontEnable) {
                            newValues[valuesSearcher.name].disabled = false;
                        }

                        if(this.state.valuesSearcherCallbacks[valuesSearcher.searcherName]) {
                            this.state.valuesSearcherCallbacks[valuesSearcher.searcherName](
                                // format as react-select wants the values
                                newValues[valuesSearcher.name].values.map(option => ({
                                    ...option,
                                    label: option.text,
                                }))
                            );

                            newCallbacks[valuesSearcher.searcherName] = null;
                        }
                    }
                });

                if(Object.entries(newValues).length > 0) {
                    const newSchema = Object.entries(formSchema).reduce(
                        (result, [name, fieldSchema]) => {
                            if(!newValues[name]) {
                                return {
                                    ...result,
                                    [name]: fieldSchema,
                                };
                            }

                            return {
                                ...result,
                                [name]: {
                                    ...formSchema[name],
                                    ...newValues[name],
                                },
                            };
                        },
                        {}
                    );

                    // This function triggers a setState,
                    // Which will re-render the component with the updated schema
                    setAllFormSchema(newSchema);

                    this.setState({
                        valuesSearcherCallbacks: Object.entries(valuesSearcherCallbacks).reduce(
                            (result, [name, callback]) => {
                                if(!newCallbacks[name]) {
                                    return {
                                        ...result,
                                        [name]: callback,
                                    };
                                }

                                return {
                                    ...result,
                                    [name]: newCallbacks[name],
                                };
                            },
                            {}
                        ),
                    });
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
            const { token } = this.props;
            const { valuesSearcherCallbacks } = this.state;
            const dispatchedValuesSearchers = valuesSearchers.reduce(
                (result, valuesSearcher) => ({
                    ...result,
                    [valuesSearcher.searcherName]: debounce((inputValue, callback) => {
                        this.setState({
                            valuesSearcherCallbacks: {
                                ...valuesSearcherCallbacks,
                                [valuesSearcher.searcherName]: callback,
                            }
                        });

                        const data = {
                            token,
                            q: inputValue,
                        };
                        this.props[valuesSearcher.searcherName]({ data });
                    }, 500),
                }),
                {}
            );

            return (
                <ComponentToWrap
                    {...this.props}
                    {...this.state}
                    dispatchedValuesSearchers={dispatchedValuesSearchers}
                    handleCKEditorImageFileUpload={this.handleCKEditorImageFileUpload}
                    handleCreateResource={this.handleCreateResource}
                />
            );
        }
    }

    const mapStateToProps = (state, ownProps) => {
        const { token } = state.auth;
        const {
            created,
            error,
            resource
        } = state[reducerName];
        const errors = getApiErrorMessages(error);
        const urlParams = ownProps.match.params;

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
            urlParams,
            resource: typeof resource === 'undefined' ? null : resource,
        };

        // We loop the valuesFetchers from the updatedSchema
        // So we can add for each one of them additional resources and errors props
        valuesFetchers.forEach(valuesFetcher => {
            newProps[valuesFetcher.reducerName] = {};
            newProps[valuesFetcher.reducerName].fetching_resources = state[valuesFetcher.reducerName].fetching_resources;
            newProps[valuesFetcher.reducerName].resources = state[valuesFetcher.reducerName].resources;
            newProps[valuesFetcher.reducerName].errors = getApiErrorMessages(
                state[valuesFetcher.reducerName].error
            );
        });

        // We loop the valuesFetchers from the updatedSchema
        // So we can add for each one of them additional resources and errors props
        valuesSearchers.forEach(valuesSearcher => {
            if(!newProps[valuesSearcher.reducerName]) {
                newProps[valuesSearcher.reducerName] = {};
                newProps[valuesSearcher.reducerName].fetching_resources = state[valuesSearcher.reducerName].fetching_resources;
                newProps[valuesSearcher.reducerName].resources = state[valuesSearcher.reducerName].resources;
                newProps[valuesSearcher.reducerName].errors = getApiErrorMessages(
                    state[valuesSearcher.reducerName].error
                );
            }
        });

        return newProps;
    };

    const mapDispatchToProps = {
        clearMetadataResourceCreate,
        createImage,
        createResource,
        updateImage,
    };

    // We add additional dispatch actions for each valuesFetcher from the updatedSchema
    valuesFetchers.forEach(valuesFetcher => {
        mapDispatchToProps[valuesFetcher.fetcherName] = valuesFetcher.fetcher;
    });

    // We add additional dispatch actions for each valuesSearcher from the updatedSchema
    valuesSearchers.forEach(valuesSearcher => {
        mapDispatchToProps[valuesSearcher.searcherName] = valuesSearcher.searcher;
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(
        withUpdateFormSchema({
            attributesSequenceToShow,
            nameField,
            schema,
        })(CreateHOC)
    );
};

export default withCreateResource;
