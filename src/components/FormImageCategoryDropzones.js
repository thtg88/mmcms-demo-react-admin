import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import Dropzone from 'react-dropzone';
import ApiErrorCard from './Cards/ApiErrorCard';
import { getApiErrorMessages } from '../helpers/apiMessages';
import {
    apiResourceCreateSuccessNotification,
    apiResourceDestroySuccessNotification,
} from '../helpers/toastNotification';
import {
    createResource as createImage,
    destroyResource as destroyImage,
    updateResource as updateImage,
} from '../redux/images/actions';
import {
    reducerName as imageReducerName,
    resourceBaseRoute,
} from '../redux/images/schema';
import { resourceBaseRoute as imageThumbnailsResourceBaseRoute } from '../redux/imageThumbnails/schema';

const { REACT_APP_FILE_UPLOAD_BASE_URL } = process.env;

class FormImageCategoryDropzones extends Component {
    constructor(props) {
        super(props);

        this.handleImageFileRemove = this.handleImageFileRemove.bind(this);
        this.handleImageFileUpload = this.handleImageFileUpload.bind(this);
        this.removeImage = this.removeImage.bind(this);

        this.state = {
            images: [],
            imageCategories: [],
        };
    }

    handleImageFileRemove(evt, imageId) {
        evt.preventDefault();

        if(imageId) {
            this.removeImage(parseInt(imageId, 10));
        }
    }

    handleImageFileUpload(acceptedFiles, rejectedFiles, imageCategoryId, existingImageId) {
        const {
            createImage,
            parentResourceTableName,
            parentResource,
            token,
        } = this.props;
        const { imageCategories } = this.state;

        if(acceptedFiles.length > 0) {
            if(existingImageId) {
                this.removeImage(existingImageId);
            }

            // We set the given category id as uploading so that UI can react accordingly
            this.setState({
                imageCategories: imageCategories.map(imageCategory => {
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
                target_id: parentResource.id,
                target_table: parentResourceTableName,
            };
            createImage({ data: createData });
        }

        if(rejectedFiles.length > 0) {
            // TODO show error?
        }
    }

    removeImage(imageId) {
        const { updateImage, token } = this.props;
        const { images } = this.state;

        // We remove the image from state
        this.setState({
            images: images.filter((image) => image.id !== imageId),
        });

        // update imageId to have no category
        const data = {
            token,
            image_category_id: null,
            id: imageId,
        };
        updateImage({ data });
    }

    componentDidMount() {
        const { parentResource } = this.props;
        const newState = {};

        // If the parentResource has image categories
        // it means we need to display a special part of the form
        // So we set this in state
        if(typeof parentResource.image_categories !== 'undefined') {
            if(parentResource.image_categories.length) {
                newState.images = parentResource.images && parentResource.images.length ? [...parentResource.images] : [];
                newState.imageCategories = parentResource.image_categories.map((imageCategory) => ({...imageCategory, isUploading: false}));
            }
        }

        this.setState({
            ...newState,
        });
    }

    componentDidUpdate(prevProps) {
        const {
            created,
            destroyed,
            errors,
            resource,
        } = this.props;
        const { imageCategories, images } = this.state;

        // This means that if I was creating/destroying the image,
        // And I have errors,
        // so we set all image categories uploading to false
        if(
            (
                !prevProps.errors
                || !prevProps.errors.length
            )
            && errors
            && errors.length
            && errors.length > 0
        ) {
            this.setState({
                imageCategories: imageCategories.map(imageCategory => ({...imageCategory, isUploading: false})),
            });
        }

        // This means we were destroying an image
        // and it's been created correctly
        // So we append it to the existing images array
        // and we set all image categories uploading to false
        else if(prevProps.destroyed === false && destroyed === true) {
            apiResourceDestroySuccessNotification({
                resourceDisplayName: 'Image',
            });
        }

        // This means we were creating an image
        // and it's been created correctly
        // So we append it to the existing images array
        // and we set all image categories uploading to false
        else if(prevProps.created === false && created === true) {
            apiResourceCreateSuccessNotification({
                resourceDisplayName: 'Image',
                iconClassName: 'fa-image',
            });

            this.setState({
                imageCategories: imageCategories.map(imageCategory => ({...imageCategory, isUploading: false})),
                images: [
                    ...images,
                    resource,
                ],
            });
        }
    }

    render() {
        const { errors, parentResource } = this.props;
        const {
            images,
            imageCategories,
        } = this.state;

        if (
            !parentResource.image_categories
            || !parentResource.image_categories.length

        ) {
            return (
                <p>
                    Image upload not available yet.
                    Please contact support.
                </p>
            );
        }

        return (
            <>
                <Row>
                    <Col className="col-md-12">
                        <ApiErrorCard errors={errors} />
                    </Col>
                </Row>
                {
                    imageCategories.map((imageCategory, idx) => {
                        const currentImages = images.filter((image) => {
                            return image.image_category_id === imageCategory.id;
                        });

                        return (
                            <Fragment key={idx}>
                                <p className="mb-2">{imageCategory.name}</p>
                                {
                                    currentImages.length > 0
                                        ? (
                                            <Row className="mb-2">
                                                <Col className="col-md-6 col-12 mb-2 mb-md-0">
                                                    <img
                                                        src={`${REACT_APP_FILE_UPLOAD_BASE_URL}${currentImages[0].url}`}
                                                        alt={currentImages[0].title}
                                                        className="img-fluid border"
                                                    />
                                                </Col>
                                                <Col className="col-md-6 col-12">
                                                    <Row>
                                                        <Col className="col-md-12 col-4 mb-2">
                                                            <Button
                                                                type="button"
                                                                color="danger"
                                                                onClick={(evt) => this.handleImageFileRemove(evt, currentImages[0].id)}
                                                                title="Remove Image"
                                                            >
                                                                <i className="fa fa-fw fa-trash-o"></i>
                                                            </Button>
                                                        </Col>
                                                        <Col className="col-md-12 col-4 mb-2">
                                                            <Button
                                                                color="warning"
                                                                tag={Link}
                                                                to={`/${resourceBaseRoute}/${currentImages[0].id}`}
                                                                title="Edit Image"
                                                            >
                                                                <i className="fa fa-fw fa-pencil"></i>
                                                            </Button>
                                                        </Col>
                                                        <Col className="col-md-12 col-4 mb-2">
                                                            <Button
                                                                color="info"
                                                                tag={Link}
                                                                to={`/${resourceBaseRoute}/${currentImages[0].id}/${imageThumbnailsResourceBaseRoute}`}
                                                                title="Show Thumbnails"
                                                            >
                                                                <i className="fa fa-fw fa-copy"></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        )
                                        : null
                                }
                                <Dropzone
                                    accept="image/*"
                                    multiple={false}
                                    onDrop={(acceptedFiles, rejectedFiles) => this.handleImageFileUpload(
                                        acceptedFiles,
                                        rejectedFiles,
                                        imageCategory.id,
                                        currentImages.length > 0 ? currentImages[0].id : null
                                    )}
                                >
                                    {
                                        ({getRootProps, getInputProps, isDragActive}) => {
                                            return (
                                                <Row>
                                                    <Col className="col-md-12">
                                                        <div {...getRootProps()} className={`dropzone-content-container mb-4 rounded py-2 px-3 ${isDragActive ? 'bg-success' : ''}`}>
                                                            {
                                                                imageCategory.isUploading === true
                                                                    ? (
                                                                        <p className="mb-0 dropzone-content-caption">
                                                                            <i className="fa fa-fw fa-spin fa-spinner"></i>
                                                                            {' '}
                                                                            Uploading...
                                                                        </p>
                                                                    )
                                                                    : (
                                                                        <>
                                                                            <input {...getInputProps()} />
                                                                            <p className="mb-0 dropzone-content-caption">
                                                                                Drop a new picture here, or click to select a new picture to upload.
                                                                            </p>
                                                                        </>
                                                                    )
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>
                                            );
                                        }
                                    }
                                </Dropzone>
                            </Fragment>
                        );
                    })
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    const { token } = state.auth;
    const {
        created,
        destroyed,
        error,
        resource,
    } = state[imageReducerName];
    const errors = getApiErrorMessages(error);

    return {
        created,
        destroyed,
        errors,
        resource,
        token,
    };
};

const mapDispatchToProps = {
    createImage,
    destroyImage,
    updateImage,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormImageCategoryDropzones);
