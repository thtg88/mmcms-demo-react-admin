import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

const RegenerateResourceModal = ({
    disabled,
    isOpen,
    onRegenerateButtonClick,
    regenerateButtonIconClassName,
    resourceDisplayName,
    toggle,
}) => (
    <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-secondary"
    >
        <ModalHeader toggle={toggle}>Regenerate {resourceDisplayName}</ModalHeader>
        <ModalBody>
            Are you sure you want to regenerate this {resourceDisplayName}?
        </ModalBody>
        <ModalFooter>
            <Button color="primary" disabled={disabled} onClick={onRegenerateButtonClick}>
                <i className={regenerateButtonIconClassName}></i>
                {' '}
                Yes, Regenerate
            </Button>
            {' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
);

RegenerateResourceModal.propTypes = {
    disabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    onRegenerateButtonClick: PropTypes.func,
    regenerateButtonIconClassName: PropTypes.string,
    resourceDisplayName: PropTypes.string,
    toggle: PropTypes.func,
};

RegenerateResourceModal.defaultProps = {
    resourceDisplayName: 'resource',
};

export default RegenerateResourceModal;
