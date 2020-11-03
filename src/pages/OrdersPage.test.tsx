import React from 'react';
import {shallow} from 'enzyme';
import OrdersPage from './OrdersPage';
import {findByTestAttr} from '../setupTests';

describe('OrdersPage component', () => {

    test('', () => {
        const wrapper = shallow(<OrdersPage/>)
        expect(findByTestAttr(wrapper, 'orders-page-header').text()).toBe('Your orders')
        expect(findByTestAttr(wrapper, 'orders-page-moto').text()).toBe('Track your orders here')
        expect(wrapper.find('Orders').length).toBe(1)
    })

})
