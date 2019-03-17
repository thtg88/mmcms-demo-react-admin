import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import * as yup from 'yup';
import { getApiErrorMessages } from '../../../helpers/apiErrorMessages';
import { getSelectOptions } from '../../../helpers/formResources';
import {
    getFormResourceFromValues,
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../../helpers/formResources';
import { getResourceFromPaginatedResourcesAndId } from '../../../helpers/paginatedResources';
import {
    apiResourceCreateSuccessNotification,
    apiResourceDestroySuccessNotification,
    apiResourcePublishSuccessNotification,
    apiResourceRecoverSuccessNotification,
    apiResourceUnpublishSuccessNotification,
    apiResourceUpdateSuccessNotification,
} from '../../../helpers/toastNotification';
import {
    createResource as createImage,
    destroyResource as destroyImage,
    reducerName as imageReducerName,
} from '../../../redux/images/actions';
import {
    clearMetadataResourceEdit as clearMetadataSeoEntryEdit,
    createResource as createSeoEntry,
    updateResource as updateSeoEntry,
    reducerName as seoEntryReducerName,
} from '../../../redux/seoEntries/actions';
import {
    resourceDisplayName as seoEntryResourceDisplayName,
    schema as seoEntrySchema,
} from '../../../redux/seoEntries/schema';

const seoAttributesToShow = [
    'page_title',
    'meta_title',
    'meta_description',
    'meta_robots_follow',
    'meta_robots_index',
    'json_schema',
    'facebook_description',
	'facebook_image',
	'facebook_title',
	'twitter_description',
	'twitter_image',
	'twitter_title',
];

const withEditResource = ({
    attributesSequenceToShow,
    clearMetadataResourceEdit,
    destroyResource,
    publishResource,
    unpublishResource,
    findResource,
    getPaginatedResources,
    pageSize,
    recoverResource,
    resourceBaseRoute,
    resourceDisplayName,
    resourceTableName,
    schema,
    reducerName,
    updateResource,
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

    class EditHOC extends Component {
        constructor(props) {
            super(props);

            this.forceUpdateSchema = this.forceUpdateSchema.bind(this);
            this.handleCreateSeoEntry = this.handleCreateSeoEntry.bind(this);
            this.handleDestroyResource = this.handleDestroyResource.bind(this);
            this.handleImageFileRemove = this.handleImageFileRemove.bind(this);
            this.handleImageFileUpload = this.handleImageFileUpload.bind(this);
            this.handlePublishResource = this.handlePublishResource.bind(this);
            this.handleRecoverResource = this.handleRecoverResource.bind(this);
            this.handleUnpublishResource = this.handleUnpublishResource.bind(this);
            this.handleUpdateResource = this.handleUpdateResource.bind(this);
            this.handleUpdateSeoEntry = this.handleUpdateSeoEntry.bind(this);
            this.removeImage = this.removeImage.bind(this);
            this.toggleDestroyResourceModal = this.toggleDestroyResourceModal.bind(this);
            this.togglePublishResourceModal = this.togglePublishResourceModal.bind(this);
            this.toggleRecoverResourceModal = this.toggleRecoverResourceModal.bind(this);
            this.toggleUnpublishResourceModal = this.toggleUnpublishResourceModal.bind(this);
            this.updateInputValue = this.updateInputValue.bind(this);
            this.updateResourceValueState = this.updateResourceValueState.bind(this);
            this.updateSeoInputValue = this.updateSeoInputValue.bind(this);

            const uriObj = queryString.parse(props.location.search);

            this.state = {
                creatingSeoEntry: false,
                destroying_resource: false,
                getting_resource: false,
                hasImages: false,
                hasSeo: false,
                images: [],
                imageCategories: [],
                isDestroyResourceModalOpen: false,
                isPublishResourceModalOpen: false,
                isRecoverResourceModalOpen: false,
                isRecovering: parseInt(uriObj.recovery, 10) === 1,
                isUnpublishResourceModalOpen: false,
                publishing_resource: false,
                recoveringResource: false,
                resource: null,
                resourceUnchanged: true,
                seoEntry: null,
                seoEntryId: null,
                seoEntryUnchanged: true,
                unpublishing_resource: false,
                updating_resource: false,
                updatingSeoEntry: false,
            };
        }

        forceUpdateSchema() {
            const { resource } = this.props;

            this.setState({
                resource: getFormResourceFromValues(resource, schema, attributesSequenceToShow),
            });
        }

        handleCreateSeoEntry(evt) {
            evt.preventDefault();

            this.setState({
                creatingSeoEntry: true,
            });

            const { createSeoEntry, token, urlResourceId } = this.props;
            const data = {
                token,
                target_id: urlResourceId,
                target_table: resourceTableName,
            };
            createSeoEntry({ data })
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

        handleImageFileRemove(evt, imageId) {
            evt.preventDefault();

            if(imageId) {
                this.removeImage(parseInt(imageId, 10));
            }
        }

        handleImageFileUpload(acceptedFiles, rejectedFiles, imageCategoryId, existingImageId) {
            const { createImage, token, urlResourceId } = this.props;
            const { imageCategories } = this.state;

            if(acceptedFiles.length > 0) {
                if(existingImageId) {
                    this.removeImage(existingImageId);
                }

                // We set the given category id as uploading so that UI can react accordingly
                this.setState({
                    imageCategories: imageCategories.map((imageCategory) => {
                        if(imageCategory.id === imageCategoryId) {
                            return {
                                ...imageCategory,
                                isUploading: true,
                            };
                        }

                        return imageCategory;
                    }),
                });

                // add/upload file for imageCategoryId
                const createData = {
                    token,
                    data: acceptedFiles[0],
                    image_category_id: imageCategoryId,
                    target_id: urlResourceId,
                    target_table: resourceTableName,
                };
                createImage({ data: createData });
            }

            if(rejectedFiles.length > 0) {
                // TODO show error?
            }
        }

        handlePublishResource(evt) {
            evt.preventDefault();

            const { publishResource, token, urlResourceId } = this.props;
            const data = {
                id: urlResourceId,
                token,
            };

            this.setState({
                publishing_resource: true,
            });

            publishResource({ data });
        }

        handleRecoverResource(evt) {
            evt.preventDefault();

            const { recoverResource, token, urlResourceId } = this.props;
            const data = {
                id: urlResourceId,
                token,
            };

            this.setState({
                recoveringResource: true,
            });

            recoverResource({ data });
        }

        handleUnpublishResource(evt) {
            evt.preventDefault();

            const { unpublishResource, token, urlResourceId } = this.props;
            const data = {
                id: urlResourceId,
                token,
            };

            this.setState({
                unpublishing_resource: true,
            });

            unpublishResource({ data });
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
                    scroll.scrollToTop();

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

        async handleUpdateSeoEntry(evt) {
            evt.preventDefault();

            const { updateSeoEntry, token } = this.props;
            const { seoEntry, seoEntryId } = this.state;
            const values = getValuesFromFormResource(seoEntry);
            const validationSchema = getValidationSchemaFromFormResource(seoEntry);
            const data = {
                id: seoEntryId,
                token,
                ...values
            };

            // Reset errors
            this.setState({
                seoEntry: updateFormResourceFromErrors(seoEntry, {inner:[]})
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
                        updatingSeoEntry: true,
                    });

                    updateSeoEntry({ data });
                })
                .catch((errors) => {
                    // If validation does not passes
                    // Set errors in the form
                    this.setState({
                        seoEntry: updateFormResourceFromErrors(seoEntry, errors)
                    });
                });
        }

        removeImage(imageId) {
            const { destroyImage, token } = this.props;
            const { images } = this.state;

            // We remove the image from state
            this.setState({
                images: images.filter((image) => image.id !== imageId),
            });

            // remove imageId
            const destroyData = {
                token,
                id: imageId,
            };
            destroyImage({ data: destroyData });
        }

        setInputValueState(name, value, resourceKey) {
            const resource = this.state[resourceKey];
            const resourceUnchangedKey = resourceKey+'Unchanged';
            const resourceUnchanged = this.state[resourceUnchangedKey];

            if(resourceUnchanged === true) {
                this.setState({
                    [resourceUnchangedKey]: false,
                });
            }

            this.setState({
                [resourceKey]: Object.assign(resource, {
                    [name]: Object.assign(resource[name], { value }),
                }),
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

        toggleUnpublishResourceModal(evt) {
            evt.preventDefault();

            this.setState({
                isUnpublishResourceModalOpen: !this.state.isUnpublishResourceModalOpen
            });
        }

        updateInputValue(evt, extra) {
            this.updateResourceValueState(evt, extra, 'resource');
        }

        updateSeoInputValue(evt, extra) {
            this.updateResourceValueState(evt, extra, 'seoEntry');
        }

        updateResourceValueState(evt, extra, resourceKey) {
            // This means that a monkey-patched React-Select is updating data
            if(extra && extra.action && extra.name) {

                // A single-value selected option
                if(extra.action === 'select-option' && evt.label && evt.value) {
                    this.setInputValueState(extra.name, evt.value, resourceKey);
                }

                // A multiple-value selected option
                else if(extra.action === 'select-option' && typeof evt.length !== 'undefined') {
                    this.setInputValueState(extra.name, evt.map(option => option.value), resourceKey);
                }

                // A multiple value has removed a value
                else if(extra.action === 'remove-value' && typeof evt.length !== 'undefined') {
                    this.setInputValueState(extra.name, evt.map(option => option.value), resourceKey);
                }

                // The value has been cleared
                else if(extra.action === 'clear') {
                    // For a multiple select, we set the value to an empty array
                    if(extra.multiple) {
                        this.setInputValueState(extra.name, [], resourceKey);
                    }

                    // For a single select, we set it to null
                    else {
                        this.setInputValueState(extra.name, null, resourceKey);
                    }
                }
            } else {
                this.setInputValueState(evt.target.name, evt.target.value, resourceKey);
            }
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
            const { isRecovering } = this.state;

            // If resource is already in global state
            // Avoid re-fetching
            if(resource === null) {
                const data = {
                    token,
                    id: urlResourceId,
                    recovery: isRecovering === true ? 1 : 0,
                };

                this.setState({
                    getting_resource: true
                });

                findResource({ data });

            } else {
                this.forceUpdateSchema();
            }

            // Get all the resources in the background
            // so that when the user goes back to the list
            // he can see the latest changes
            if(created === true) {
                apiResourceCreateSuccessNotification({ resourceDisplayName });

                const data = {
                    token,
                    pageSize,
                    page: 1,
                };
                getPaginatedResources({ data });
            }

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

                    // If the fetcher reducer name is the same as the component reducerName
                    // i.e. I'm fetching the same kind of resource
                    // We disable the urlResourceId from being selected
                    // i.e. no circular relationship on itself
                    const disabledValues = reducerName === valuesFetcher.reducerName
                        ? [urlResourceId]
                        : [];
                    schema[valuesFetcher.name].values = getSelectOptions(
                        this.props[valuesFetcher.reducerName],
                        schema[valuesFetcher.name].selectOptionText,
                        schema[valuesFetcher.name].selectOptionValue,
                        disabledValues
                    );

                    // This function triggers a setState,
                    // Which will re-render the component with the updated schema
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
                imageDestroyed,
                imageErrors,
                resource,
                published,
                recovered,
                seoEntry,
                seoEntryCreated,
                seoEntryErrors,
                seoEntryUpdated,
                unpublished,
                updated,
                urlResourceId,
            } = this.props;
            const {
                destroying_resource,
                imageCategories,
                images,
                publishing_resource,
                recoveringResource,
                unpublishing_resource,
                updating_resource,
                updatingSeoEntry,
            } = this.state;

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
                    isDestroyResourceModalOpen: false,
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
                apiResourceUpdateSuccessNotification({
                    resourceDisplayName: resourceDisplayName ? resourceDisplayName : undefined
                });

                this.setState({
                    getting_resource: false,
                    updating_resource: false,
                });
            }

            // This means that I was publishing the resource,
            // And I received errors from the store
            // So it's time to restore the Publish button
            else if(
                publishing_resource === true
                && typeof errors.length !== 'undefined'
                && errors.length !== 0
            ) {
                this.setState({
                    getting_resource: false,
                    publishing_resource: false,
                    isPublishResourceModalOpen: false,
                });
            }

            // This means that I was publishing the resource,
            // And I received an published from the store
            // So it's time to restore the Publish button
            else if(
                publishing_resource === true
                && published === true
            ) {
                apiResourcePublishSuccessNotification({
                    resourceDisplayName: resourceDisplayName ? resourceDisplayName : undefined
                });

                this.setState({
                    getting_resource: false,
                    isPublishResourceModalOpen: false,
                    publishing_resource: false,
                    resource: getFormResourceFromValues(resource, schema, attributesSequenceToShow),
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
                    getting_resource: false,
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
                    getting_resource: false,
                    isRecovering: false,
                    isRecoverResourceModalOpen: false,
                    recoveringResource: false,
                    resource: getFormResourceFromValues(resource, schema, attributesSequenceToShow),
                });

                history.push('/'+resourceBaseRoute+'/'+urlResourceId);
            }

            // This means that I was unpublishing the resource,
            // And I received errors from the store
            // So it's time to restore the Unpublish button
            else if(
                unpublishing_resource === true
                && typeof errors.length !== 'undefined'
                && errors.length !== 0
            ) {
                this.setState({
                    getting_resource: false,
                    unpublishing_resource: false,
                    isUnpublishResourceModalOpen: false,
                });
            }

            // This means that I was unpublishing the resource,
            // And I received an unpublished from the store
            // So it's time to restore the Unpublish button
            else if(
                unpublishing_resource === true
                && unpublished === true
            ) {
                apiResourceUnpublishSuccessNotification({
                    resourceDisplayName: resourceDisplayName ? resourceDisplayName : undefined
                });

                this.setState({
                    getting_resource: false,
                    isUnpublishResourceModalOpen: false,
                    resource: getFormResourceFromValues(resource, schema, attributesSequenceToShow),
                    unpublishing_resource: false,
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
                    isDestroyResourceModalOpen: false,
                });
            }

            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            else if(resource !== null && prevProps.resource === null) {
                this.setState({
                    resource: getFormResourceFromValues(resource, schema, attributesSequenceToShow),
                    getting_resource: false,
                    updating_resource: false,
                });

                // If the resource has image categories
                // it means we need to display a special part of the form
                // So we set this in state
                if(typeof resource.image_categories !== 'undefined' && resource.image_categories.length) {
                    this.setState({
                        hasImages: true,
                        images: resource.images && resource.images.length ? [...resource.images] : [],
                        imageCategories: resource.image_categories.map((imageCategory) => ({...imageCategory, isUploading: false})),
                    });
                }

                // If the resource has an seo_entry
                // it means we need to display a special part of the form
                // So we set this in state
                if(typeof resource.seo_entry !== 'undefined') {
                    this.setState({
                        hasSeo: true,
                        seoEntry: getFormResourceFromValues(resource.seo_entry, seoEntrySchema, seoAttributesToShow),
                        seoEntryId: resource.seo_entry ? resource.seo_entry.id : null,
                    });
                }
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
            ) {
                this.setState({
                    imageCategories: imageCategories.map((imageCategory) => ({...imageCategory, isUploading: false})),
                });
            }

            // This means we were destroying an image
            // and it's been created correctly
            // So we append it to the existing images array
            // and we set all image categories uploading to false
            else if(prevProps.imageDestroyed === false && imageDestroyed === true) {
                apiResourceDestroySuccessNotification({
                    resourceDisplayName: 'Image',
                });
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

                this.setState({
                    imageCategories: imageCategories.map((imageCategory) => ({...imageCategory, isUploading: false})),
                    images: [
                        ...images,
                        image,
                    ],
                });
            }

            // This means that if I was creating/updating an SEO entry,
            // And I have errors,
            // so we set the state accordingly
            else if(
                (
                    !prevProps.seoEntryErrors
                    || !prevProps.seoEntryErrors.length
                )
                && seoEntryErrors
                && seoEntryErrors.length
                && seoEntryErrors.length > 0
            ) {
                this.setState({
                    creatingSeoEntry: false,
                });
            }

            // This means we were creating an SEO entry
            // and it's been created correctly
            // So we set the SEO entry in state
            else if(prevProps.seoEntryCreated === false && seoEntryCreated === true) {
                apiResourceCreateSuccessNotification({
                    resourceDisplayName: 'SEO',
                    iconClassName: 'fa-search',
                });

                this.setState({
                    creatingSeoEntry: false,
                    seoEntry: getFormResourceFromValues(seoEntry, seoEntrySchema, seoAttributesToShow),
                });
            }

            // This means that I was updating the SEO entry,
            // And I received errors from the store
            // So it's time to restore the Update button
            else if(
                updatingSeoEntry === true
                && typeof seoEntryErrors.length !== 'undefined'
                && seoEntryErrors.length !== 0
            ) {
                this.setState({
                    updatingSeoEntry: false,
                });
            }

            // This means that I was updating the resource,
            // And I received an updated from the store
            // So it's time to restore the Update button
            else if(
                updatingSeoEntry === true
                && seoEntryUpdated === true
            ) {
                apiResourceUpdateSuccessNotification({
                    resourceDisplayName: seoEntryResourceDisplayName ? seoEntryResourceDisplayName : undefined
                });

                this.setState({
                    updatingSeoEntry: false,
                });
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
                    // If the fetcher reducer name is the same as the component reducerName
                    // i.e. I'm fetching the same kind of resource
                    // We disable the urlResourceId from being selected
                    // i.e. no circular relationship on itself
                    const disabledValues = reducerName === valuesFetcher.reducerName
                        ? [urlResourceId]
                        : [];
                    schema[valuesFetcher.name].values = getSelectOptions(
                        this.props[valuesFetcher.reducerName],
                        schema[valuesFetcher.name].selectOptionText,
                        schema[valuesFetcher.name].selectOptionValue,
                        disabledValues
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
            const { clearMetadataResourceEdit, clearMetadataSeoEntryEdit } = this.props;

            if(typeof clearMetadataResourceEdit !== 'undefined') {
                clearMetadataResourceEdit();
            }

            if(typeof clearMetadataSeoEntryEdit !== 'undefined') {
                clearMetadataSeoEntryEdit();
            }
        }

        render() {
            return (
                <ComponentToWrap
                    forceUpdateSchema={this.forceUpdateSchema}
                    handleCreateSeoEntry={this.handleCreateSeoEntry}
                    handleDestroyResource={this.handleDestroyResource}
                    handleImageFileRemove={this.handleImageFileRemove}
                    handleImageFileUpload={this.handleImageFileUpload}
                    handlePublishResource={this.handlePublishResource}
                    handleRecoverResource={this.handleRecoverResource}
                    handleUnpublishResource={this.handleUnpublishResource}
                    handleUpdateResource={this.handleUpdateResource}
                    handleUpdateSeoEntry={this.handleUpdateSeoEntry}
                    toggleDestroyResourceModal={this.toggleDestroyResourceModal}
                    togglePublishResourceModal={this.togglePublishResourceModal}
                    toggleRecoverResourceModal={this.toggleRecoverResourceModal}
                    toggleUnpublishResourceModal={this.toggleUnpublishResourceModal}
                    updateInputValue={this.updateInputValue}
                    updateSeoInputValue={this.updateSeoInputValue}
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
            resources,
            published,
            recovered,
            unpublished,
            updated,
        } = state[reducerName];
        const errors = getApiErrorMessages(error);
        const urlResourceId = parseInt(ownProps.match.params.id, 10);
        let { resource } = state[reducerName];

        if(
            resource === null
            || typeof resource === 'undefined'
            || resource.id !== urlResourceId
        ) {
            resource = getResourceFromPaginatedResourcesAndId(resources, urlResourceId);
        }

        // Get images data
        const imageCreated = state[imageReducerName].created;
        const imageDestroyed = state[imageReducerName].destroyed;
        const image = state[imageReducerName].resource;
        const imageError = state[imageReducerName].error;
        const imageErrors = getApiErrorMessages(imageError);

        // Get SEO entry data
        const seoEntryCreated = state[seoEntryReducerName].created;
        const seoEntryUpdated = state[seoEntryReducerName].updated;
        const seoEntry = state[seoEntryReducerName].resource;
        const seoEntryError = state[seoEntryReducerName].error;
        const seoEntryErrors = getApiErrorMessages(seoEntryError);

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
            seoEntry,
            seoEntryCreated,
            seoEntryErrors,
            seoEntryUpdated,
            token,
            unpublished,
            updated,
            urlResourceId,
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
        clearMetadataResourceEdit,
        clearMetadataSeoEntryEdit,
        createImage,
        createSeoEntry,
        destroyImage,
        destroyResource,
        findResource,
        getPaginatedResources,
        publishResource,
        recoverResource,
        unpublishResource,
        updateResource,
        updateSeoEntry,
    };

    // We add additional dispatch actions for each valuesFetcher from the schema
    valuesFetchers.forEach(valuesFetcher => {
        mapDispatchToProps[valuesFetcher.fetcherName] = valuesFetcher.fetcher;
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditHOC);
};

export default withEditResource;
