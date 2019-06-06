import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import * as yup from 'yup';
import { getApiErrorMessages, getApiWarningMessages } from '../../../helpers/apiMessages';
import { getSelectOptions } from '../../../helpers/formResources';
import {
    getFormResourceFromValues,
    getValidationSchemaFromFormSchema,
    getValuesFromFormSchema,
    updateFormResourceFromErrors,
} from '../../../helpers/formResources';
import slugify from '../../../helpers/slugify';
import { replaceUrlParameters } from '../../../helpers/url';
import {
    apiResourceCreateSuccessNotification,
    apiResourcePublishSuccessNotification,
    apiResourceRecoverSuccessNotification,
    apiResourceRegenerateSuccessNotification,
    apiResourceUnpublishSuccessNotification,
    apiResourceUpdateSuccessNotification,
} from '../../../helpers/toastNotification';
import {
    createResource as createImage,
    destroyResource as destroyImage,
    updateResource as updateImage,
} from '../../../redux/images/actions';
import { reducerName as imageReducerName } from '../../../redux/images/schema';

const { REACT_APP_API_BASE_URL } = process.env;

const withEditResource = ({
    attributesSequenceToShow,
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    nameField,
    publishResource,
    recoverResource,
    reducerName,
    regenerateResource,
    resourceBaseRoute,
    resourceDisplayName,
    resourceTableName,
    schema,
    unpublishResource,
    updateResource,
    urlParamsResourceIdCheckDisabled,
}) => (ComponentToWrap) => {
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
    const valuesSearchers = Object.entries(updatedSchema)
        .filter(([name, params], idx) => typeof params.valuesSearcher !== 'undefined')
        .map(([name, params], idx) => ({...params.valuesSearcher, name: name}));

    class EditHOC extends Component {
        constructor(props) {
            super(props);

            this.forceUpdateSchema = this.forceUpdateSchema.bind(this);
            this.handleCKEditorImageFileUpload = this.handleCKEditorImageFileUpload.bind(this);
            this.handleDestroyResource = this.handleDestroyResource.bind(this);
            this.handlePublishResource = this.handlePublishResource.bind(this);
            this.handleRecoverResource = this.handleRecoverResource.bind(this);
            this.handleRegenerateResource = this.handleRegenerateResource.bind(this);
            this.handleUnpublishResource = this.handleUnpublishResource.bind(this);
            this.handleUpdateResource = this.handleUpdateResource.bind(this);
            this.toggleDestroyResourceModal = this.toggleDestroyResourceModal.bind(this);
            this.togglePublishResourceModal = this.togglePublishResourceModal.bind(this);
            this.toggleRecoverResourceModal = this.toggleRecoverResourceModal.bind(this);
            this.toggleRegenerateResourceModal = this.toggleRegenerateResourceModal.bind(this);
            this.toggleUnpublishResourceModal = this.toggleUnpublishResourceModal.bind(this);
            this.updateInputValue = this.updateInputValue.bind(this);

            const uriObj = queryString.parse(props.location.search);

            this.state = {
                destroyingResource: false,
                formSchema: null,
                gettingResource: false,
                hasSeo: false,
                hasVariants: false,
                imageUploadRejectPromise: null,
                imageUploadResolvePromise: null,
                isDestroyResourceModalOpen: false,
                isPublishResourceModalOpen: false,
                isRecoverResourceModalOpen: false,
                isRegenerateResourceModalOpen: false,
                isRecovering: parseInt(uriObj.recovery, 10) === 1,
                isUnpublishResourceModalOpen: false,
                publishingResource: false,
                recoveringResource: false,
                regeneratingResource: false,
                resourceUnchanged: true,
                unpublishingResource: false,
                updatingResource: false,
                valuesSearcherCallbacks: {},
                variants: [],
            };
        }

        forceUpdateSchema() {
            const { resource } = this.props;

            this.setState({
                formSchema: getFormResourceFromValues(resource, updatedSchema, attributesSequenceToShow),
            });
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

            const { updateResource, resource, token } = this.props;
            const { formSchema } = this.state;
            const values = getValuesFromFormSchema(formSchema);
            const validationSchema = getValidationSchemaFromFormSchema(formSchema);
            const data = {
                id: resource.id,
                token,
                ...values,
            };

            // Reset errors
            this.setState({
                formSchema: updateFormResourceFromErrors(formSchema, {inner:[]})
            });

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
                    this.setState({
                        formSchema: updateFormResourceFromErrors(formSchema, errors)
                    });
                });
        }

        setInputValueState(name, value) {
            const { formSchema, resourceUnchanged } = this.state;
            const newValue = {
                formSchema: Object.assign(formSchema, {
                    [name]: Object.assign(formSchema[name], { value }),
                }),
            };

            if(name !== 'slug' && name === nameField && formSchema.slug) {
                newValue.formSchema.slug = {
                    ...formSchema.slug,
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

        toggleUnpublishResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                isUnpublishResourceModalOpen: !this.state.isUnpublishResourceModalOpen
            });
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

        componentDidMount() {
            const {
                findResource,
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

            // We loop the valuesFetchers from the updatedSchema
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

                    if(!updatedSchema[valuesFetcher.name].dontEnable) {
                        // While we fetch them, we disable the input
                        // to give a visual feedback to the user
                        updatedSchema[valuesFetcher.name].disabled = true;
                    }
                } else {
                    // Otherwise we get them from state and update the updatedSchema,

                    // If the fetcher reducer name is the same as the component reducerName
                    // i.e. I'm fetching the same kind of resource
                    // We disable the urlParams.id from being selected
                    // i.e. no circular relationship on itself
                    const disabledValues = reducerName === valuesFetcher.reducerName
                        ? [urlParams.id]
                        : [];
                    updatedSchema[valuesFetcher.name].values = getSelectOptions(
                        this.props[valuesFetcher.reducerName].resources,
                        updatedSchema[valuesFetcher.name].selectOptionText,
                        updatedSchema[valuesFetcher.name].selectOptionValue,
                        disabledValues
                    );

                    // This function triggers a setState,
                    // Which will re-render the component with the updated updatedSchema
                    this.forceUpdateSchema();
                }
            });
        }

        componentDidUpdate(prevProps) {
            const {
                destroyed,
                errors,
                history,
                image,
                imageCreated,
                imageErrors,
                resource,
                published,
                recovered,
                regenerated,
                unpublished,
                updated,
                urlParams,
            } = this.props;
            const {
                destroyingResource,
                formSchema,
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
                    formSchema: getFormResourceFromValues(resource, updatedSchema, attributesSequenceToShow),
                });
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
                apiResourceRecoverSuccessNotification({
                    resourceDisplayName: resourceDisplayName ? resourceDisplayName : undefined
                });

                this.setState({
                    gettingResource: false,
                    isRecovering: false,
                    isRecoverResourceModalOpen: false,
                    recoveringResource: false,
                    formSchema: getFormResourceFromValues(resource, updatedSchema, attributesSequenceToShow),
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
                    formSchema: getFormResourceFromValues(resource, updatedSchema, attributesSequenceToShow),
                    isRegenerateResourceModalOpen: false,
                    regeneratingResource: false,
                });
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
                    formSchema: getFormResourceFromValues(resource, updatedSchema, attributesSequenceToShow),
                    unpublishingResource: false,
                });
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
                                updatedSchema[valuesSearcher.name].values = getSelectOptions(
                                    resource[relationshipName].constructor === Array ? resource[relationshipName] : [resource[relationshipName]],
                                    updatedSchema[valuesSearcher.name].selectOptionText,
                                    updatedSchema[valuesSearcher.name].selectOptionValue
                                );
                            }
                        }
                    });
                }

                this.setState({
                    formSchema: getFormResourceFromValues(resource, updatedSchema, attributesSequenceToShow),
                    gettingResource: false,
                    updatingResource: false,
                });
            }

            else if(
                resource
                && prevProps.resource
                && resource.id !== prevProps.resource.id
            ) {
                // If the id changes, chances are we are remounting the component
                // With a different resource, so reset schema
                this.setState({
                    formSchema: getFormResourceFromValues(resource, updatedSchema, attributesSequenceToShow),
                    gettingResource: false,
                    updatingResource: false,
                });
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
                        updatedSchema[valuesFetcher.name].values = getSelectOptions(
                            this.props[valuesFetcher.reducerName].resources,
                            updatedSchema[valuesFetcher.name].selectOptionText,
                            updatedSchema[valuesFetcher.name].selectOptionValue,
                            disabledValues
                        );
                        if(!updatedSchema[valuesFetcher.name].dontEnable) {
                            updatedSchema[valuesFetcher.name].disabled = false;
                        }

                        forceUpdateSchema = true;
                    }
                });

                if(forceUpdateSchema === true) {
                    // This function triggers a setState,
                    // Which will re-render the component with the updated updatedSchema
                    this.forceUpdateSchema();
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
                            updatedSchema[valuesSearcher.name].selectOptionText,
                            updatedSchema[valuesSearcher.name].selectOptionValue
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
                    // This function triggers a setState,
                    // Which will re-render the component with the updated schema
                    this.setState({
                        formSchema: Object.entries(formSchema).reduce(
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
                        ),
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
                    dispatchedValuesSearchers={dispatchedValuesSearchers}
                    forceUpdateSchema={this.forceUpdateSchema}
                    handleCKEditorImageFileUpload={this.handleCKEditorImageFileUpload}
                    handleDestroyResource={this.handleDestroyResource}
                    handleGenerateVariants={this.handleGenerateVariants}
                    handlePublishResource={this.handlePublishResource}
                    handleRecoverResource={this.handleRecoverResource}
                    handleRegenerateResource={this.handleRegenerateResource}
                    handleSetVariantSelectedAttributeTypeId={this.handleSetVariantSelectedAttributeTypeId}
                    handleSetVariantSelectedAttributeValueId={this.handleSetVariantSelectedAttributeValueId}
                    handleUnpublishResource={this.handleUnpublishResource}
                    handleUpdateResource={this.handleUpdateResource}
                    toggleDestroyResourceModal={this.toggleDestroyResourceModal}
                    togglePublishResourceModal={this.togglePublishResourceModal}
                    toggleRecoverResourceModal={this.toggleRecoverResourceModal}
                    toggleRegenerateResourceModal={this.toggleRegenerateResourceModal}
                    toggleUnpublishResourceModal={this.toggleUnpublishResourceModal}
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
            published,
            recovered,
            regenerated,
            resource,
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
    )(EditHOC);
};

export default withEditResource;
