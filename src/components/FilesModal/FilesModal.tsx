import React from 'react';
import {Modal} from 'react-bootstrap';
import {useOrderDocs} from '../../hooks/useOrderDocs';
import {IOrder, IServiceListItem} from '../../store/retail/interfaces';
import {useOrderServiceItemDocs} from '../../hooks/useOrderServiceItemDocs';

type Props = {
    order: IOrder,
    orderServiceItem: IServiceListItem,
    show: boolean
    handleClose: () => void
}

const FilesModal: React.FC<Props> = ({order, orderServiceItem, show, handleClose}) => {
    const orderDocs = useOrderDocs(order)
    const orderServiceItemDocs = useOrderServiceItemDocs(orderServiceItem)

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>File manager</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {orderDocs.map(doc => <div key={doc.id}>{doc.name}</div>)}
                <hr/>
                {orderServiceItemDocs.map(doc => <div key={doc.id}>{doc.name}</div>)}
            </Modal.Body>
        </Modal>
    )
}

export default FilesModal
