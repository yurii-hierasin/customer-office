import React from 'react';
import {Modal} from 'react-bootstrap';

type Props = {
    show: boolean
    handleClose: () => void
}

const ApplicationEditModal: React.FC<Props> = ({show, handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit application</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
        </Modal>
    )
}

export default ApplicationEditModal
