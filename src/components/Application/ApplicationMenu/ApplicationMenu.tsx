import React, {useState} from 'react';
import treeDotsVerticalIcon from '../../../icons/TreeDotsVertical.svg';
import uploadIcon from '../../../icons/Upload.svg';
import editIcon from '../../../icons/Edit.svg';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import {IOrder, ShipmentTypesEnum} from '../../../store/retail/interfaces';
import ApplicationService from '../../../services/ApplicationService';
import FilesModal from '../../FilesModal/FilesModal';
import ApplicationEditModal from '../../ApplicationEditModal/ApplicationEditModal';

interface IApplicationMenuProps {
    order: IOrder,
    applicationService: ApplicationService
}

const ApplicationMenu = ({order, applicationService}: IApplicationMenuProps) => {
    const [showFilesModal, setFilesModalShow] = useState(false);
    const [showEditModal, setEditModalShow] = useState(false);

    const handleFilesModalClose = () => setFilesModalShow(false);
    const handleFilesModalShow = () => setFilesModalShow(true);

    const handleApplicationEditModalClose = () => setEditModalShow(false);
    const handleApplicationEditModalShow = () => setEditModalShow(true);

    return (
        <DropdownButton drop="left" title={<img src={treeDotsVerticalIcon} alt="menu" className="mb-1"/>}>
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

            {showFilesModal && <FilesModal
                order={order}
                orderServiceItem={applicationService.getApplication()}
                show={showFilesModal}
                handleClose={handleFilesModalClose}
            />}

            {showEditModal && <ApplicationEditModal
                show={showEditModal}
                handleClose={handleApplicationEditModalClose}
            />}

        </DropdownButton>
    )
}

export default ApplicationMenu
