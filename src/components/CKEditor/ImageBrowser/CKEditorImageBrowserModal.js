import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import {
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from 'reactstrap';
import CKEditorImageBrowserEditor from './CKEditorImageBrowserEditor';
import CKEditorImageBrowserList from './CKEditorImageBrowserList';
import CKEditorImagrBrowserModalButtonBar from './CKEditorImagrBrowserModalButtonBar';
import ApiErrorCard from '../../Cards/ApiErrorCard';
import { getApiErrorMessages } from '../../../helpers/apiMessages';

const { REACT_APP_API_BASE_URL } = process.env;

class CKEditorImageBrowserModal extends Component {
    constructor(props) {
        super(props);

        this.cropperComponent = createRef();

        this.closeImageBrowser = this.closeImageBrowser.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChoose = this.onChoose.bind(this);
        this.setIsEditing = this.setIsEditing.bind(this);
        this.setIsSaving = this.setIsSaving.bind(this);
        this.setSelectedImage = this.setSelectedImage.bind(this);

        this.state = {
            isEditing: false,
            isSaving: false,
            selectedImage: null,
        };
    }

    closeImageBrowser() {
        const { setIsImageBrowserOpen } = this.props;

        this.setState({
            isEditing: false,
            isSaving: false,
            selectedImage: null,
        });

        setIsImageBrowserOpen(false);
    }

    onChoose() {
        const { imageBrowserCommand } = this.props;

        // Simply fire the choose event
        imageBrowserCommand.fire('file:choose', {...this.state.selectedImage, baseUrl: REACT_APP_API_BASE_URL});

        this.closeImageBrowser();
    }

    onSave () {
        const { ckEditorConfig, imageBrowserCommand } = this.props;
        const fileData = this.cropperComponent.current.cropper.getCroppedCanvas().toDataURL();

        // Set CKEditor ImageBrowser plugin's config to set state of modals properly
        // After either onUploadResolve or onUploadReject
        ckEditorConfig.set('imageBrowser.onUploadResolve', this.closeImageBrowser);
        ckEditorConfig.set('imageBrowser.onUploadReject', () => this.setIsSaving(false));

        imageBrowserCommand.fire('file:resizeImage', {...this.state.selectedImage, data: fileData});

        this.setIsSaving(true);
    }

    setSelectedImage(selectedImage) {
        this.setState({
            selectedImage,
        });
    }

    setIsEditing(isEditing) {
        this.setState({
            isEditing,
        });
    }

    setIsSaving(isSaving) {
        this.setState({
            isSaving,
        });
    }

    render () {
        const { errors, isImageBrowserOpen } = this.props;
        const {
            isEditing,
            isSaving,
            selectedImage,
        } = this.state;
        const saveButtonIconClassName = isSaving === true
            ? 'fa fa-fw fa-spinner fa-spin'
            : 'fa fa-fw fa-save';
        const saveButtonText = isSaving === true
            ? 'Saving...'
            : 'Save';

        return (
            <Modal
                className="modal-xl modal-info"
                isOpen={isImageBrowserOpen}
                toggle={this.closeImageBrowser}
            >
                <ModalHeader toggle={this.closeImageBrowser} className="p-2">Image Browser</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col className="col-md-12">
                            <ApiErrorCard errors={errors} />
                        </Col>
                    </Row>
                    {
                        isImageBrowserOpen === true
                            ? (
                                isEditing === true && selectedImage !== null
                                    ? (
                                        <CKEditorImageBrowserEditor
                                            imageSrc={`${REACT_APP_API_BASE_URL}${selectedImage.url}`}
                                            ref={this.cropperComponent}
                                        />
                                    )
                                    : (
                                        <CKEditorImageBrowserList
                                            selectedItem={selectedImage}
                                            setSelectedItem={this.setSelectedImage}
                                        />
                                    )
                            )
                            : null
                    }
                </ModalBody>
                <ModalFooter>
                    <CKEditorImagrBrowserModalButtonBar
                        closeImageBrowser={this.closeImageBrowser}
                        isEditing={isEditing}
                        isSaving={isSaving}
                        onChoose={this.onChoose}
                        onSave={this.onSave}
                        saveButtonIconClassName={saveButtonIconClassName}
                        saveButtonText={saveButtonText}
                        selectedImage={selectedImage}
                        setIsEditing={this.setIsEditing}
                    />
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    const { error } = state.images;
    const errors = getApiErrorMessages(error);

    return {
        errors,
    };
}

export default connect(mapStateToProps)(CKEditorImageBrowserModal);
