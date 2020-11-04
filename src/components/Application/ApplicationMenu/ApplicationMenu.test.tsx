import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import ApplicationMenu from './ApplicationMenu';
import order from '../../../../mocks/data/order.json'
import ApplicationService from '../../../services/ApplicationService';
import {findByTestAttr} from '../../../setupTests';

const setUp = () => {
    return shallow(<ApplicationMenu
        order={order}
        applicationService={(new ApplicationService(order.service_list[0]))}
    />)
}

describe('ApplicationMenu component', () => {

    let wrapper: ShallowWrapper

    beforeEach(() => wrapper = setUp())

    test('should render', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should get order number', () => {
        expect(findByTestAttr(wrapper, 'order-number').text())
            .toBe('US288669')
    })

    test('should be inbound shipping default label', () => {
        expect(findByTestAttr(wrapper, 'shipping-inbound-label').text())
            .toBe('None')
    })

    test('should be return shipping default label', () => {
        expect(findByTestAttr(wrapper, 'shipping-return-label').text())
            .toBe('None')
    })

})
