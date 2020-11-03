import React from 'react';
import {useOrders} from '../../hooks/useOrders';
import Application from '../Application/Application';
import {useDestinations} from '../../hooks/useDestinations';
import {useCitizenships} from '../../hooks/useCitizenships';
import {useVisaGroups} from '../../hooks/useVisaGroups';

const Orders = () => {
    const orders = useOrders()
    const visaGroups = useVisaGroups()
    const destinations = useDestinations()
    useCitizenships()

    return orders.length ? (
        <div data-test="orders-list">
            {orders.map(order => order.service_list.map(application => {
                return <Application
                    application={application}
                    visaGroups={visaGroups}
                    destinations={destinations}
                    paymentStatus={order.status}
                    key={application.id}
                />
            }))}
        </div>
    ) : null
}

export default Orders
