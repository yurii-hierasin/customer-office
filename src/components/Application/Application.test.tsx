import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Application from './Application';
import order from '../../../mocks/data/order.json'
import visaGroups from '../../../mocks/data/visa-groups.json'
import destinations from '../../../mocks/data/destinations.json'
import {findByTestAttr} from '../../setupTests';
import {useSelector} from 'react-redux';
import StatusesService from '../../services/StatusesService';
import {IServiceListItem} from '../../store/retail/interfaces';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}))

const mockUseSelector = useSelector as jest.Mock
mockUseSelector.mockReturnValue('en')

const application = order.service_list[0]
const setUp = (serviceListItem: IServiceListItem = application): ShallowWrapper => {
    return shallow(<Application
        application={serviceListItem}
        visaGroups={visaGroups}
        destinations={destinations}
        paymentStatus={order.status}
    />)
}

describe('Application component', () => {

    let wrapper: ShallowWrapper

    beforeEach(() => {
        wrapper = setUp()
    })

    test('date correct', () => {
        expect(findByTestAttr(wrapper, 'date').text()).toBe('Nov 1, 2020')
    })

    test('description correct', () => {
        expect(findByTestAttr(wrapper, 'desc').text()).toBe('Multiple entry / Work visa / Ukraine')
    })

    test('service correct', () => {
        expect(findByTestAttr(wrapper, 'service-label').text()).toBe(application.service.label)
    })

    test('applicant full name correct', () => {
        expect(findByTestAttr(wrapper, 'applicant-full-name').text()).toBe('John Doe')
    })

    test('button label has pending status and green color', () => {
        const status = StatusesService.statuses.find(s => s.status === application.status)
        const btnText = (status && status.description) || ''

        const btnWrapper = findByTestAttr(wrapper, 'btn-status')

        expect(btnWrapper.text()).toBe(btnText)
        expect(btnWrapper.hasClass('btn-success')).toBeTruthy()
    })

    test('button has red color in cancelled status', () => {
        const app = {...application, status: 'cancelled'}
        const wrapper = setUp(app)
        const btnWrapper = findByTestAttr(wrapper, 'btn-status')
        expect(btnWrapper.hasClass('btn-danger')).toBeTruthy()
    })

    test('service price items is correct', () => {
        expect(findByTestAttr(wrapper, 'price').text()).toBe('554.00 USD')
    })

})
