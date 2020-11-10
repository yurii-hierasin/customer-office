import React, {FC} from 'react';
import {Button, Modal, ModalProps} from 'react-bootstrap';

type Props = {
    bodyText: string
    handleAgree: (isAgree: boolean) => void
}

const Confirm:FC<Props & ModalProps> = ({bodyText, handleAgree, ...props}) => {
    return (
        <Modal
            {...props}
            centered
        >
            <Modal.Header closeButton onClick={() => handleAgree(false)}>
                Confirm please
            </Modal.Header>
            <Modal.Body>
                <p>
                    {bodyText}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleAgree(false)} data-test="cancel-btn">
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => handleAgree(true)} data-test="ok-btn">
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirm
