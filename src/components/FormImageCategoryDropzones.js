import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import Dropzone from 'react-dropzone';
import ApiErrorCard from './Cards/ApiErrorCard';

const { REACT_APP_FILE_UPLOAD_BASE_URL } = process.env;

const FormImageCategoryDropzones = ({
    images,
    imageCategories,
    imageErrors,
    onFileDrop,
    onFileRemove,
}) => {
    return (
        <>
            <Row>
                <Col className="col-md-12">
                    <ApiErrorCard errors={imageErrors} />
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
                                            <Col className="col-md-4 col-10">
                                                <img
                                                    src={`${REACT_APP_FILE_UPLOAD_BASE_URL}${currentImages[0].url}`}
                                                    alt={currentImages[0].title}
                                                    className="img-fluid border"
                                                />
                                            </Col>
                                            <Col className="col-md-8 col-2">
                                                <Button
                                                    type="button"
                                                    color="danger"
                                                    onClick={(evt) => onFileRemove(evt, currentImages[0].id)}
                                                >
                                                    <i className="fa fa-fw fa-trash-o"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    )
                                    : null
                            }
                            <Dropzone
                                accept="image/*"
                                multiple={false}
                                onDrop={(acceptedFiles, rejectedFiles) => onFileDrop(
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
    )
};

FormImageCategoryDropzones.propTypes = {
    images: PropTypes.array,
    imageCategories: PropTypes.array,
    imageErrors: PropTypes.array,
    onFileDrop: PropTypes.func,
    onFileRemove: PropTypes.func,
};

export default FormImageCategoryDropzones;
