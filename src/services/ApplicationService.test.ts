import ApplicationService from './ApplicationService';
import order from '../../mocks/data/order.json'
import orders from '../../mocks/data/orders.json'
import visaGroups from '../../mocks/data/visa-groups.json'
import destinations from '../../mocks/data/destinations.json'
import {ShipmentTypesEnum} from '../store/retail/interfaces';

describe('Application Service', () => {

    let applicationService: ApplicationService

    beforeEach(() => {
        applicationService = new ApplicationService(order.service_list[0])
    })

    test('getCreatedDate', () => {
        expect(applicationService.getCreatedDate('en-US'))
            .toBe('Nov 1, 2020')
    })

    test('.getServiceDescription', () => {
        expect(applicationService.getServiceDescription(visaGroups, destinations))
            .toBe('Multiple entry / Work visa / Ukraine')
    })

    test('.getFullName', () => {
        expect(applicationService.getFullName()).toBe('John Doe')
    })

    test('.getTotal', () => {
        expect(applicationService.getTotal()).toBe('554.00 USD')
    })

    test('.getShippingLabel is None', () => {
        expect(applicationService.getShippingLabel(ShipmentTypesEnum.outbound, order.shipping_list))
            .toBe('None')
        expect(applicationService.getShippingLabel(ShipmentTypesEnum.inbound, order.shipping_list))
            .toBe('None')
    })

    test('.getShippingLabel is Defined', () => {
        expect(applicationService.getShippingLabel(ShipmentTypesEnum.outbound, orders[0].shipping_list))
            .toBe('Fedex Priority Overnight')
        expect(applicationService.getShippingLabel(ShipmentTypesEnum.inbound, orders[0].shipping_list))
            .toBe('Fedex Standard Overnight')
    })

})
