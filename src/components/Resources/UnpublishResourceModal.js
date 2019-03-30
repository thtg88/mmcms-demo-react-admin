import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

const UnpublishResourceModal = ({
    disabled,
    isOpen,
    onUnpublishButtonClick,
    resourceDisplayName,
    toggle,
    unpublishButtonIconClassName,
}) => (
    <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-warning"
    >
        <ModalHeader toggle={toggle}>Unpublish {resourceDisplayName}</ModalHeader>
        <ModalBody>
            Are you sure you want to unpublish this {resourceDisplayName}?
        </ModalBody>
        <ModalFooter>
            <Button color="warning" disabled={disabled} onClick={onUnpublishButtonClick}>
                <i className={unpublishButtonIconClassName}></i>
                {' '}
                Yes, Unpublish
            </Button>
            {' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
);

UnpublishResourceModal.propTypes = {
    disabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    onUnpublishButtonClick: PropTypes.func,
    resourceDisplayName: PropTypes.string,
    toggle: PropTypes.func,
    unpublishButtonIconClassName: PropTypes.string,
};

UnpublishResourceModal.defaultProps = {
    resourceDisplayName: 'resource',
};

export default UnpublishResourceModal;
