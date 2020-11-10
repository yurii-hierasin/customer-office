import React, {useState} from 'react';
import uploadIcon from '../../../icons/Upload.svg';
import editIcon from '../../../icons/Edit.svg';
import {Dropdown} from 'react-bootstrap';
import {IOrder, ShipmentTypesEnum} from '../../../store/retail/interfaces';
import ApplicationService from '../../../services/ApplicationService';
import DocsModal from '../../docs-modal/DocsModal';
import ApplicationEditModal from '../../ApplicationEditModal/ApplicationEditModal';
import TreeDotsToggle from '../../TreeDotsToggle';
import DocumentsService from '../../../services/documents.service';


interface IApplicationMenuProps {
    order: IOrder,
    applicationService: ApplicationService
}

const ApplicationMenu = ({order, applicationService}: IApplicationMenuProps) => {
    const [showDocsModal, setDocsModalShow] = useState(false);
    const [showEditModal, setEditModalShow] = useState(false);

    const handleFilesModalClose = () => setDocsModalShow(false);
    const handleFilesModalShow = () => setDocsModalShow(true);

    const handleApplicationEditModalClose = () => setEditModalShow(false);
    const handleApplicationEditModalShow = () => setEditModalShow(true);

    return (
        <Dropdown>
            <Dropdown.Toggle as={TreeDotsToggle}/>
            <Dropdown.Menu>
                <Dropdown.Item
                    as="button"
                    onClick={handleApplicationEditModalShow}
                    data-test="edit-btn"
                >
                    <img src={editIcon} alt="Edit application"/>
                    <span className="pl-1" data-test="edit">Edit</span>
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
                    onClick={handleFilesModalShow}
                    data-test="file-btn"
                >
                    <img src={uploadIcon} alt="Upload|Download files"/>
                    <span className="pl-1" data-test="file">File</span>
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.ItemText>
                    <p>Service details:</p>
                    <p>
                        <span>Order: </span>
                        <span data-test="order-number">{order.invoice}</span>
                    </p>
                    <p>
                        <span>Inbound shipping: </span>
                        <span data-test="shipping-inbound-label">
                        {applicationService.getShippingLabel(ShipmentTypesEnum.inbound, order.shipping_list)}
                    </span>
                    </p>
                    <p>
                        <span>Return shipping: </span>
                        <span data-test="shipping-return-label">
                        {applicationService.getShippingLabel(ShipmentTypesEnum.outbound, order.shipping_list)}
                    </span>
                    </p>
                </Dropdown.ItemText>

                {showDocsModal && (
                    <DocsModal
                        order={order}
                        orderServiceItem={applicationService.getApplication()}
                        handleClose={handleFilesModalClose}
                        documentsService={new DocumentsService()}
                    />
                )}

                {showEditModal && <ApplicationEditModal
                    show={showEditModal}
                    handleClose={handleApplicationEditModalClose}
                />}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ApplicationMenu
