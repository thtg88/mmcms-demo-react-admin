import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

const DestroyResourceModal = ({
    destroyButtonIconClassName,
    disabled,
    isOpen,
    onDestroyButtonClick,
    resourceDisplayName,
    toggle,
}) => (
    <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-danger"
    >
        <ModalHeader toggle={toggle}>Remove {resourceDisplayName}</ModalHeader>
        <ModalBody>
            Are you sure you want to remove this {resourceDisplayName}?
        </ModalBody>
        <ModalFooter>
            <Button
                type="button"
                color="danger"
                disabled={disabled}
                onClick={onDestroyButtonClick}
            >
                <i className={destroyButtonIconClassName}></i>
                {' '}
                Yes, Remove
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
    resourceDisplayName: PropTypes.string,
    toggle: PropTypes.func,
};

DestroyResourceModal.defaultProps = {
    resourceDisplayName: 'resource',
}

export default DestroyResourceModal;
