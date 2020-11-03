import React from 'react';
import {shallow} from 'enzyme';
import Orders from './Orders';
import {findByTestAttr, getStore} from '../../setupTests';
import {Provider} from 'react-redux';
import orders from '../../../mocks/data/orders.json'
import {useOrders} from '../../hooks/useOrders';
import {useVisaGroups} from '../../hooks/useVisaGroups';
import {useDestinations} from '../../hooks/useDestinations';
import {useCitizenships} from '../../hooks/useCitizenships';

jest.mock('../../hooks/useOrders')
jest.mock('../../hooks/useVisaGroups')
jest.mock('../../hooks/useDestinations')
jest.mock('../../hooks/useCitizenships')

const mockUseOrders = useOrders as jest.Mock
const mockUseVisaGroups = useVisaGroups as jest.Mock
const mockUseDestinations = useDestinations as jest.Mock
const mockUseCitizenships = useCitizenships as jest.Mock

describe('Orders component', () => {
    const mockStore = getStore();
    const getWrapper = () => shallow(
        <Provider store={mockStore}>
            <Orders/>
        </Provider>
    ).childAt(0).dive();

    test('should avoid render for 0 items', () => {
        mockUseOrders.mockReturnValue([])
        mockUseVisaGroups.mockReturnValue([])
        mockUseDestinations.mockReturnValue([])
        mockUseCitizenships.mockReturnValue([])
        const wrapper = getWrapper()
        expect(findByTestAttr(wrapper, 'orders-list').length).toBe(0)
    })

    test('should render for many items', () => {
        mockUseOrders.mockReturnValue(orders)
        mockUseVisaGroups.mockReturnValue([])
        mockUseDestinations.mockReturnValue([])
        mockUseCitizenships.mockReturnValue([])
        const wrapper = getWrapper()
        expect(findByTestAttr(wrapper, 'orders-list').length).toBe(1)

        const applicationsLength = orders
            .map(order => order.service_list.length)
            .reduce((acc, length) => acc + length, 0)

        expect(wrapper.find('Application').length)
            .toBe(applicationsLength)

    });
});
