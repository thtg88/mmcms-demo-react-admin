import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

const DestroyResourceModal = ({
    destroyButtonIconClassName,
    disabled,
    isOpen,
    onDestroyButtonClick,
    toggle
}) => (
    <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-danger"
    >
        <ModalHeader toggle={toggle}>Delete Resource</ModalHeader>
        <ModalBody>
            Are you sure you want to delete this resource?
        </ModalBody>
        <ModalFooter>
            <Button color="danger" disabled={disabled} onClick={onDestroyButtonClick}>
                <i className={destroyButtonIconClassName}></i>
                {' '}
                Yes, Delete
            </Button>
            {' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
);

DestroyResourceModal.propTypes = {
    destroyButtonIconClassName: PropTypes.string,
    disabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    onDestroyButtonClick: PropTypes.func,
    toggle: PropTypes.func
};

export default DestroyResourceModal;
