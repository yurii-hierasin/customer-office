import React from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import {IOrder, ShipmentTypesEnum} from '../../../store/retail/interfaces';
import ApplicationService from '../../../services/ApplicationService';

interface IApplicationMenuProps {
    order: IOrder,
    applicationService: ApplicationService
}

const ApplicationMenu = ({order, applicationService}: IApplicationMenuProps) => {
    return (
        <DropdownButton drop="left" title={
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots-vertical mb-1"
                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
        }>
            <Dropdown.Item as="button">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cloud-upload"
                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                    <path fillRule="evenodd"
                          d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                <span className="pl-1">Edit</span>
            </Dropdown.Item>
            <Dropdown.Item as="button">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil"
                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
                <span className="pl-1">File</span>
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.ItemText>
                <p>Service details:</p>
                <p>Order: <span>{order.invoice}</span></p>
                <p>
                    <span>Inbound shipping:</span>
                    <span data-test="shipping-inbound-label">
                        {applicationService.getShippingLabel(ShipmentTypesEnum.inbound, order.shipping_list)}
                    </span>
                </p>
                <p>
                    <span>Return shipping:</span>
                    <span data-test="shipping-return-label">
                        {applicationService.getShippingLabel(ShipmentTypesEnum.outbound, order.shipping_list)}
                    </span>
                </p>
            </Dropdown.ItemText>
        </DropdownButton>
    )
}

export default ApplicationMenu