import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

const PublishResourceModal = ({
    disabled,
    isOpen,
    onPublishButtonClick,
    publishButtonIconClassName,
    resourceDisplayName,
    toggle,
}) => (
    <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-success"
    >
        <ModalHeader toggle={toggle}>Publish {resourceDisplayName}</ModalHeader>
        <ModalBody>
            Are you sure you want to publish this {resourceDisplayName}?
        </ModalBody>
        <ModalFooter>
            <Button color="success" disabled={disabled} onClick={onPublishButtonClick}>
                <i className={publishButtonIconClassName}></i>
                {' '}
                Yes, Publish
            </Button>
            {' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
);

PublishResourceModal.propTypes = {
    disabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    onPublishButtonClick: PropTypes.func,
    publishButtonIconClassName: PropTypes.string,
    resourceDisplayName: PropTypes.string,
    toggle: PropTypes.func,
};

PublishResourceModal.defaultProps = {
    resourceDisplayName: 'resource',
};

export default PublishResourceModal;
