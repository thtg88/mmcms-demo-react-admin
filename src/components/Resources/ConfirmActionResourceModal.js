import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

const ConfirmActionResourceModal = ({
    actionName,
    buttonClassName,
    buttonIconClassName,
    modalClassName,
    disabled,
    isOpen,
    modalBodyText,
    onButtonClick,
    resourceDisplayName,
    toggle,
}) => (
    <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={modalClassName}
    >
        <ModalHeader toggle={toggle}>{`${actionName} ${resourceDisplayName}`}</ModalHeader>
        <ModalBody>
            {
                modalBodyText
                    ? modalBodyText
                    : `Are you sure you want to ${actionName} this ${resourceDisplayName}?`
            }
        </ModalBody>
        <ModalFooter>
            <Button color={buttonClassName} disabled={disabled} onClick={onButtonClick}>
                <i className={buttonIconClassName}></i>
                {` Yes, ${actionName.charAt(0).toUpperCase()}${actionName.slice(1).toLowerCase()}`}
            </Button>
            {' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
);

ConfirmActionResourceModal.propTypes = {
    actionName: PropTypes.string,
    buttonClassName: PropTypes.string,
    buttonIconClassName: PropTypes.string,
    modalClassName: PropTypes.string,
    disabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    modalBodyText: PropTypes.string,
    onButtonClick: PropTypes.func,
    resourceDisplayName: PropTypes.string,
    toggle: PropTypes.func
};

export default ConfirmActionResourceModal;
