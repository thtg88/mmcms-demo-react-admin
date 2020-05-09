import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import * as yup from 'yup';
import withUpdateFormSchema from '../withUpdateFormSchema';
import { getApiErrorMessages, getApiWarningMessages } from '../../../helpers/apiMessages';
import { getSelectOptions } from '../../../helpers/formResources';
import {
    getFormResourceFromValues,
    getValidationSchemaFromFormSchema,
    getValuesFromFormSchema,
    getValuesSearchersFromSchema,
} from '../../../helpers/formResources';
import { replaceUrlParameters } from '../../../helpers/url';
import {
    apiResourceCreateSuccessNotification,
    apiResourcePublishSuccessNotification,
    apiResourceRecoverSuccessNotification,
    apiResourceRegenerateSuccessNotification,
    apiResourceSendCodeSuccessNotification,
    apiResourceUnpublishSuccessNotification,
    apiResourceUpdateSuccessNotification,
} from '../../../helpers/toastNotification';
import reducerRegistry from '../../../redux/reducerRegistry';
import sagaRegistry from '../../../redux/sagaRegistry';
import {
    createResource as createImage,
    destroyResource as destroyImage,
    updateResource as updateImage,
} from '../../../redux/images/actions';
import { reducerName as imageReducerName } from '../../../redux/images/schema';

const { REACT_APP_API_BASE_URL } = process.env;

const withEditResource = ({
    additionalReducers,
    additionalSagas,
    attributesSequenceToShow,
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    nameField,
    publishResource,
    recoverResource,
    reducerName,
    reducers,
    regenerateResource,
    resourceBaseRoute,
    resourceDisplayName,
    resourceTableName,
    sagas,
    schema,
    sendCodeResource,
    unpublishResource,
    updateResource,
    urlParamsResourceIdCheckDisabled,
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

    // We loop all the schema entries,
    // in order to get valuesFetchers from them
    // These will allow us to dispatch Redux actions,
    // Which ultimately will allow us to update the schema with the transformed
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
    const valuesSearchers = getValuesSearchersFromSchema(updatedSchema);

    class EditHOC extends Component {
        constructor(props) {
            super(props);

            this.handleCKEditorImageFileUpload = this.handleCKEditorImageFileUpload.bind(this);
            this.handleDestroyResource = this.handleDestroyResource.bind(this);
            this.handlePublishResource = this.handlePublishResource.bind(this);
            this.handleRecoverResource = this.handleRecoverResource.bind(this);
            this.handleRegenerateResource = this.handleRegenerateResource.bind(this);
            this.handleSendCodeResource = this.handleSendCodeResource.bind(this);
            this.handleUnpublishResource = this.handleUnpublishResource.bind(this);
            this.handleUpdateResource = this.handleUpdateResource.bind(this);
            this.toggleDestroyResourceModal = this.toggleDestroyResourceModal.bind(this);
            this.togglePublishResourceModal = this.togglePublishResourceModal.bind(this);
            this.toggleRecoverResourceModal = this.toggleRecoverResourceModal.bind(this);
            this.toggleRegenerateResourceModal = this.toggleRegenerateResourceModal.bind(this);
            this.toggleSendCodeResourceModal = this.toggleSendCodeResourceModal.bind(this);
            this.toggleUnpublishResourceModal = this.toggleUnpublishResourceModal.bind(this);

            const uriObj = queryString.parse(props.location.search);

            this.state = {
                destroyingResource: false,
                gettingResource: false,
                hasSeo: false,
                hasVariants: false,
                imageUploadRejectPromise: null,
                imageUploadResolvePromise: null,
                isDestroyResourceModalOpen: false,
                isPublishResourceModalOpen: false,
                isRecoverResourceModalOpen: false,
                isRegenerateResourceModalOpen: false,
                isSendCodeResourceModalOpen: false,
                isRecovering: parseInt(uriObj.recovery, 10) === 1,
                isUnpublishResourceModalOpen: false,
                publishingResource: false,
                recoveringResource: false,
                regeneratingResource: false,
                sendCodingResource: false,
                unpublishingResource: false,
                updatingResource: false,
                valuesSearcherCallbacks: {},
                variants: [],
            };
        }

        handleCKEditorImageFileUpload(file, resolvePromise, rejectPromise) {
            const { createImage, token, urlParams } = this.props;

            this.setState({
                imageUploadResolvePromise: resolvePromise,
                imageUploadRejectPromise: rejectPromise,
            });

            // add/upload file
            const data = {
                token,
                data: file,
                target_id: urlParams.id,
                target_table: resourceTableName,
            };
            createImage({ data });
        }

        handleDestroyResource(evt) {
            evt.preventDefault();

            const { destroyResource, token, urlParams } = this.props;
            const data = {
                id: urlParams.id,
                token,
            };

            this.setState({
                destroyingResource: true,
            });

            destroyResource({ data });
        }

        handlePublishResource(evt) {
            evt.preventDefault();

            const { publishResource, token, urlParams } = this.props;
            const data = {
                id: urlParams.id,
                token,
            };

            this.setState({
                publishingResource: true,
            });

            publishResource({ data });
        }

        handleRecoverResource(evt) {
            evt.preventDefault();

            const { recoverResource, token, urlParams } = this.props;
            const data = {
                id: urlParams.id,
                token,
            };

            this.setState({
                recoveringResource: true,
            });

            recoverResource({ data });
        }

        handleRegenerateResource(evt) {
            evt.preventDefault();

            const { regenerateResource, token, urlParams } = this.props;
            const data = {
                id: urlParams.id,
                token,
            };

            this.setState({
                regeneratingResource: true,
            });

            regenerateResource({ data });
        }

        handleSendCodeResource(evt) {
            evt.preventDefault();

            const { sendCodeResource, token, urlParams } = this.props;
            const data = {
                id: urlParams.id,
                token,
            };

            this.setState({
                sendCodingResource: true,
            });

            sendCodeResource({ data });
        }

        handleUnpublishResource(evt) {
            evt.preventDefault();

            const { unpublishResource, token, urlParams } = this.props;
            const data = {
                id: urlParams.id,
                token,
            };

            this.setState({
                unpublishingResource: true,
            });

            unpublishResource({ data });
        }

        async handleUpdateResource(evt) {
            evt.preventDefault();

            const {
                formSchema,
                resource,
                resetFormSchemaErrors,
                setFormSchemaErrors,
                token,
                updateResource,
            } = this.props;
            const values = getValuesFromFormSchema(formSchema);
            const validationSchema = getValidationSchemaFromFormSchema(formSchema);
            const data = {
                id: resource.id,
                token,
                ...values,
            };

            // Reset errors
            resetFormSchemaErrors();

            await yup.object(validationSchema)
                .validate(
                    values,
                    { abortEarly: false }
                )
                .then(() => {
                    // If validation passes
                    // Update resource
                    scroll.scrollToTop();

                    this.setState({
                        updatingResource: true,
                    });

                    updateResource({ data });
                })
                .catch((errors) => {
                    // If validation does not passes
                    // Set errors in the form
                    setFormSchemaErrors(errors);
                });
        }

        toggleDestroyResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                isDestroyResourceModalOpen: !this.state.isDestroyResourceModalOpen,
            });
        }

        togglePublishResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                isPublishResourceModalOpen: !this.state.isPublishResourceModalOpen,
            });
        }

        toggleRecoverResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                isRecoverResourceModalOpen: !this.state.isRecoverResourceModalOpen,
            });
        }

        toggleRegenerateResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                isRegenerateResourceModalOpen: !this.state.isRegenerateResourceModalOpen,
            });
        }

        toggleSendCodeResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                isSendCodeResourceModalOpen: !this.state.isSendCodeResourceModalOpen,
            });
        }

        toggleUnpublishResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                isUnpublishResourceModalOpen: !this.state.isUnpublishResourceModalOpen
            });
        }

        componentDidMount() {
            const {
                findResource,
                formSchema,
                setAllFormSchema,
                token,
                urlParams,
            } = this.props;
            const { isRecovering } = this.state;

            if(typeof findResource === 'function') {
                // Always fetch this mofo
                const data = {
                    token,
                    id: urlParams.id,
                    recovery: isRecovering === true ? 1 : 0,
                };

                this.setState({
                    gettingResource: true,
                });

                findResource({ data });
            }

            // We loop the valuesFetchers from the formSchema
            // In order to check if we had resources in state,
            // If not we re-fetch them
            valuesFetchers.forEach((valuesFetcher, idx) => {
                if(
                    !this.props[valuesFetcher.reducerName].resources
                    || this.props[valuesFetcher.reducerName].resources.length === 0
                ) {
                    // If there are no this.props[valuesFetcher.reducerName].resources
                    // We re-fetch them
                    const data = {
                        token,
                    };

                    if(this.props[valuesFetcher.fetcherName]) {
                        this.props[valuesFetcher.fetcherName]({ data });
                    } else {
                        // TODO only warn in development?
                        console.warn('couldn\'t load valuesFetcher', valuesFetcher);
                    }

                    if(!formSchema[valuesFetcher.name].dontEnable) {
                        // While we fetch them, we disable the input
                        // to give a visual feedback to the user
                        formSchema[valuesFetcher.name].disabled = true;
                    }
                } else if(formSchema[valuesFetcher.name]) {
                    // Otherwise we get them from state and update the formSchema,

                    // If the fetcher reducer name is the same as the component reducerName
                    // i.e. I'm fetching the same kind of resource
                    // We disable the urlParams.id from being selected
                    // i.e. no circular relationship on itself
                    const disabledValues = reducerName === valuesFetcher.reducerName
                        ? [urlParams.id]
                        : [];
                    formSchema[valuesFetcher.name].values = getSelectOptions(
                        this.props[valuesFetcher.reducerName].resources,
                        formSchema[valuesFetcher.name].selectOptionText,
                        formSchema[valuesFetcher.name].selectOptionValue,
                        disabledValues
                    );

                    // This function triggers a setState,
                    // Which will re-render the component with the updated formSchema
                    setAllFormSchema(formSchema);
                }
            });
        }

        componentDidUpdate(prevProps) {
            const {
                destroyed,
                errors,
                formSchema,
                history,
                image,
                imageCreated,
                imageErrors,
                resource,
                published,
                recovered,
                regenerated,
                setAllFormSchema,
                unpublished,
                updated,
                urlParams,
            } = this.props;
            const {
                destroyingResource,
                imageUploadRejectPromise,
                imageUploadResolvePromise,
                publishingResource,
                recoveringResource,
                regeneratingResource,
                unpublishingResource,
                updatingResource,
                valuesSearcherCallbacks,
            } = this.state;

            // This means that I was destroying the resource,
            // And I received a destroyed from the store
            // So restore the state - this will trigger a re-render
            // which will redirect us to the index
            if(
                typeof errors !== 'undefined'
                && typeof errors.length !== 'undefined'
                && errors.length === 0
                && destroyingResource === true
                && destroyed === true
            ) {
                this.setState({
                    destroyingResource: false,
                    isDestroyResourceModalOpen: false,
                });

                history.push(`/${replaceUrlParameters(resourceBaseRoute, urlParams)}`);
            }

            // This means that if I was destroying the resource,
            // And I have errors,
            // close the modal and show them
            else if(
                typeof errors !== 'undefined'
                && typeof errors.length !== 'undefined'
                && errors.length > 0
                && destroyingResource === true
            ) {
                this.setState({
                    destroyingResource: false,
                    isDestroyResourceModalOpen: false,
                });
            }

            // This means that I was updating the resource,
            // And I received errors from the store
            // So it's time to restore the Update button
            else if(
                updatingResource === true
                && typeof errors.length !== 'undefined'
                && errors.length !== 0
            ) {
                this.setState({
                    gettingResource: false,
                    updatingResource: false,
                });
            }

            // This means that I was updating the resource,
            // And I received an updated from the store
            // So it's time to restore the Update button
            else if(
                updatingResource === true
                && updated === true
            ) {
                apiResourceUpdateSuccessNotification({
                    resourceDisplayName: resourceDisplayName ? resourceDisplayName : undefined
                });

                this.setState({
                    gettingResource: false,
                    updatingResource: false,
                });
            }

            // This means that I was publishing the resource,
            // And I received errors from the store
            // So it's time to restore the Publish button
            else if(
                publishingResource === true
                && typeof errors.length !== 'undefined'
                && errors.length !== 0
            ) {
                this.setState({
                    gettingResource: false,
                    publishingResource: false,
                    isPublishResourceModalOpen: false,
                });
            }

            // This means that I was publishing the resource,
            // And I received an published from the store
            // So it's time to restore the Publish button
            else if(
                publishingResource === true
                && published === true
            ) {
                apiResourcePublishSuccessNotification({
                    resourceDisplayName: resourceDisplayName ? resourceDisplayName : undefined
                });

                this.setState({
                    gettingResource: false,
                    isPublishResourceModalOpen: false,
                    publishingResource: false,
                });

                setAllFormSchema(
                    getFormResourceFromValues(resource, formSchema, attributesSequenceToShow)
                );
            }

            // This means that I was recovering the resource,
            // And I received errors from the store
            // So it's time to restore the Recover button
            else if(
                recoveringResource === true
                && typeof errors.length !== 'undefined'
                && errors.length !== 0
            ) {
                this.setState({
                    gettingResource: false,
                    recoveringResource: false,
                    isRecoverResourceModalOpen: false,
                });
            }

            // This means that I was recovering the resource,
            // And I received an recovered from the store
            // So it's time to restore the Recover button
            else if(
                recoveringResource === true
                && recovered === true
            ) {
                setAllFormSchema(
                    getFormResourceFromValues(resource, formSchema, attributesSequenceToShow)
                );

                apiResourceRecoverSuccessNotification({
                    resourceDisplayName: resourceDisplayName ? resourceDisplayName : undefined
                });

                this.setState({
                    gettingResource: false,
                    isRecovering: false,
                    isRecoverResourceModalOpen: false,
                    recoveringResource: false,
                    resourceUnchanged: true,
                });

                history.push('/'+replaceUrlParameters(resourceBaseRoute, urlParams)+'/'+urlParams.id);
            }

            // This means that I was regenerating the resource,
            // And I received errors from the store
            // So it's time to restore the Recover button
            else if(
                regeneratingResource === true
                && typeof errors.length !== 'undefined'
                && errors.length !== 0
            ) {
                this.setState({
                    gettingResource: false,
                    regeneratingResource: false,
                    isRegenerateResourceModalOpen: false,
                });
            }

            // This means that I was regenerating the resource,
            // And I received an regenerated from the store
            // So it's time to restore the Regenerate button
            else if(
                regeneratingResource === true
                && regenerated === true
            ) {
                apiResourceRegenerateSuccessNotification({
                    resourceDisplayName: resourceDisplayName ? resourceDisplayName : undefined
                });

                this.setState({
                    gettingResource: false,
                    isRegenerateResourceModalOpen: false,
                    regeneratingResource: false,
                });

                setAllFormSchema(
                    getFormResourceFromValues(resource, formSchema, attributesSequenceToShow)
                );
            }


            // This means that I was unpublishing the resource,
            // And I received errors from the store
            // So it's time to restore the Unpublish button
            else if(
                unpublishingResource === true
                && typeof errors.length !== 'undefined'
                && errors.length !== 0
            ) {
                this.setState({
                    gettingResource: false,
                    unpublishingResource: false,
                    isUnpublishResourceModalOpen: false,
                });
            }

            // This means that I was unpublishing the resource,
            // And I received an unpublished from the store
            // So it's time to restore the Unpublish button
            else if(
                unpublishingResource === true
                && unpublished === true
            ) {
                apiResourceUnpublishSuccessNotification({
                    resourceDisplayName: resourceDisplayName ? resourceDisplayName : undefined
                });

                this.setState({
                    gettingResource: false,
                    isUnpublishResourceModalOpen: false,
                    unpublishingResource: false,
                });

                setAllFormSchema(
                    getFormResourceFromValues(resource, formSchema, attributesSequenceToShow)
                );
            }

            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            else if(resource !== null && prevProps.resource === null) {
                if(valuesSearchers.length > 0) {
                    valuesSearchers.forEach(valuesSearcher => {
                        // Here we loop all the valuesSearcher,
                        // Look if there's a relationship loaded with the same name as the valuesSearcher name,
                        // Without the _id at the end, and then we add it to the values array
                        // An example of the above is a resource object with both a "parent_id" attribute,
                        // and a "parent" one.
                        // This way react-selects will have pre-loaded value(s) in them.
                        // PLEASE NOTE: scenarios where value and text are not retrievable for a relationship,
                        // as described above are not supported.
                        if(valuesSearcher.name.indexOf('_id')) {
                            // Get rid of "_id"
                            const relationshipName = valuesSearcher.name.replace('_id', '');

                            if(
                                resource[relationshipName]
                                && (
                                    typeof resource[relationshipName] === 'object'
                                    || resource[relationshipName].constructor === Array
                                )
                            ) {
                                // If there's an attribute with that name,
                                // And it's either an object or an array
                                // We update the schema
                                formSchema[valuesSearcher.name].values = getSelectOptions(
                                    resource[relationshipName].constructor === Array ? resource[relationshipName] : [resource[relationshipName]],
                                    formSchema[valuesSearcher.name].selectOptionText,
                                    formSchema[valuesSearcher.name].selectOptionValue
                                );
                            }
                        }
                    });
                }

                this.setState({
                    gettingResource: false,
                    updatingResource: false,
                });

                setAllFormSchema(
                    getFormResourceFromValues(resource, formSchema, attributesSequenceToShow)
                );
            }

            else if(
                resource
                && prevProps.resource
                && resource.id !== prevProps.resource.id
            ) {
                // If the id changes, chances are we are remounting the component
                // With a different resource, so reset schema
                this.setState({
                    gettingResource: false,
                    updatingResource: false,
                });

                setAllFormSchema(
                    getFormResourceFromValues(resource, formSchema, attributesSequenceToShow)
                );
            }

            // This means that if I was creating/destroying the image,
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
                && imageUploadRejectPromise
            ) {
                imageUploadRejectPromise(imageErrors.join('. '));

                this.setState({
                    imageUploadRejectPromise: null,
                });
            }

            // This means we were creating an image
            // and it's been created correctly
            // So we append it to the existing images array
            // and we set all image categories uploading to false
            else if(
                prevProps.imageCreated === false
                && imageCreated === true
                && imageUploadResolvePromise
            ) {
                apiResourceCreateSuccessNotification({
                    resourceDisplayName: 'Image',
                    iconClassName: 'fa-image',
                });

                imageUploadResolvePromise({
                    default: `${REACT_APP_API_BASE_URL}${image.url}`,
                });

                this.setState({
                    imageUploadResolvePromise: null,
                });
            }

            if(valuesFetchers.length > 0) {
                let forceUpdateSchema = false;

                // We loop the valuesFetchers from the updatedSchema
                // In order to check if we had resources or errors coming back
                // so we can update the updatedSchema
                valuesFetchers.forEach(valuesFetcher => {
                    // If I was fetching this.props[valuesFetcher.reducerName].fetching_resources,
                    // and they have come back,
                    // We reset the fetching state
                    // And we update the updatedSchema
                    if(
                        prevProps[valuesFetcher.reducerName].fetching_resources === true
                        && this.props[valuesFetcher.reducerName].fetching_resources === false
                    ) {
                        // If the fetcher reducer name is the same as the component reducerName
                        // i.e. I'm fetching the same kind of resource
                        // We disable the urlParams.id from being selected
                        // i.e. no circular relationship on itself
                        const disabledValues = reducerName === valuesFetcher.reducerName
                            ? [urlParams.id]
                            : [];
                        formSchema[valuesFetcher.name].values = getSelectOptions(
                            this.props[valuesFetcher.reducerName].resources,
                            formSchema[valuesFetcher.name].selectOptionText,
                            formSchema[valuesFetcher.name].selectOptionValue,
                            disabledValues
                        );
                        if(!formSchema[valuesFetcher.name].dontEnable) {
                            formSchema[valuesFetcher.name].disabled = false;
                        }

                        forceUpdateSchema = true;
                    }
                });

                if(forceUpdateSchema === true) {
                    // This function triggers a setState,
                    // Which will re-render the component with the updated updatedSchema
                    setAllFormSchema(
                        getFormResourceFromValues(resource, formSchema, attributesSequenceToShow)
                    );
                }
            }

            if(valuesSearchers.length > 0) {
                const newValues = {};
                const newCallbacks = {};

                // We loop the valuesSearchers from the updatedSchema
                // In order to check if we had resources or errors coming back
                // so we can update the updatedSchema
                valuesSearchers.forEach(valuesSearcher => {
                    // If I was fetching this.props[`${valuesSearcher.reducerName}`].fetching_resources,
                    // and they have come back,
                    // We update the updatedSchema
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
                        if(!updatedSchema[valuesSearcher.name].dontEnable) {
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
            const { clearMetadataResourceEdit } = this.props;

            if(typeof clearMetadataResourceEdit !== 'undefined') {
                clearMetadataResourceEdit();
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
                    handleDestroyResource={this.handleDestroyResource}
                    handleGenerateVariants={this.handleGenerateVariants}
                    handlePublishResource={this.handlePublishResource}
                    handleRecoverResource={this.handleRecoverResource}
                    handleRegenerateResource={this.handleRegenerateResource}
                    handleSendCodeResource={this.handleSendCodeResource}
                    handleSetVariantSelectedAttributeTypeId={this.handleSetVariantSelectedAttributeTypeId}
                    handleSetVariantSelectedAttributeValueId={this.handleSetVariantSelectedAttributeValueId}
                    handleUnpublishResource={this.handleUnpublishResource}
                    handleUpdateResource={this.handleUpdateResource}
                    toggleDestroyResourceModal={this.toggleDestroyResourceModal}
                    togglePublishResourceModal={this.togglePublishResourceModal}
                    toggleRecoverResourceModal={this.toggleRecoverResourceModal}
                    toggleRegenerateResourceModal={this.toggleRegenerateResourceModal}
                    toggleSendCodeResourceModal={this.toggleSendCodeResourceModal}
                    toggleUnpublishResourceModal={this.toggleUnpublishResourceModal}
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
            published,
            recovered,
            regenerated,
            resource,
            sendCoded,
            unpublished,
            updated,
            variantsGenerated,
            warning,
        } = state[reducerName];
        const errors = getApiErrorMessages(error);
        const warnings = getApiWarningMessages(warning);
        const urlParams = ownProps.match.params;

        // Get images data
        const imageCreated = state[imageReducerName].created;
        const imageDestroyed = state[imageReducerName].destroyed;
        const image = state[imageReducerName].resource;
        const imageError = state[imageReducerName].error;
        const imageErrors = getApiErrorMessages(imageError);

        const newProps = {
            created,
            destroyed,
            errors,
            image,
            imageCreated,
            imageDestroyed,
            imageErrors,
            published,
            recovered,
            regenerated,
            sendCoded,
            token,
            unpublished,
            updated,
            urlParams,
            variantsGenerated,
            warnings,
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
        clearMetadataResourceEdit,
        createImage,
        destroyImage,
        destroyResource,
        findResource,
        publishResource,
        recoverResource,
        regenerateResource,
        sendCodeResource,
        unpublishResource,
        updateImage,
        updateResource,
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
        })(EditHOC)
    );
};

export default withEditResource;
