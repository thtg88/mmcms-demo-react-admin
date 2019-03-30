import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

const RecoverResourceModal = ({
    disabled,
    isOpen,
    onRecoverButtonClick,
    recoverButtonIconClassName,
    resourceDisplayName,
    toggle,
}) => (
    <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-success"
    >
        <ModalHeader toggle={toggle}>Recover {resourceDisplayName}</ModalHeader>
        <ModalBody>
            Are you sure you want to recover this {resourceDisplayName}?
        </ModalBody>
        <ModalFooter>
            <Button color="success" disabled={disabled} onClick={onRecoverButtonClick}>
                <i className={recoverButtonIconClassName}></i>
                {' '}
                Yes, Recover
            </Button>
            {' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
);

RecoverResourceModal.propTypes = {
    disabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    onRecoverButtonClick: PropTypes.func,
    recoverButtonIconClassName: PropTypes.string,
    resourceDisplayName: PropTypes.string,
    toggle: PropTypes.func,
};

RecoverResourceModal.defaultProps = {
    resourceDisplayName: 'resource',
};

export default RecoverResourceModal;
