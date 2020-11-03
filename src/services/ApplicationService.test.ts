import ApplicationService from './ApplicationService';
import order from '../../mocks/data/order.json'
import visaGroups from '../../mocks/data/visa-groups.json'
import destinations from '../../mocks/data/destinations.json'

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

})
