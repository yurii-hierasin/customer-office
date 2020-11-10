import React from 'react';
import {useDocsItem} from './hooks'
import {shallow} from 'enzyme';
import DocsItem from './DocsItem';
import docs from '../../../mocks/data/order-item-files.json';
import order from '../../../mocks/data/order.json';
import DateTimeService from '../../services/date-time.service';
import {findByTestAttr} from '../../setupTests';

const doc = docs[0]
const orderServiceItem = order.service_list[0]

const mockHandleDelete = jest.fn()
const mockHandleModalAgree = jest.fn()

jest.mock('./hooks/useDocsItem')
const mockUseDocsItem = useDocsItem as jest.Mock
mockUseDocsItem.mockReturnValue({
    showModal: false,
    dateTimeService: new DateTimeService('en-US'),
    handleDelete: mockHandleDelete,
    handleModalAgree: mockHandleModalAgree,
})


describe('DocsItem component', () => {

    test('handlerDelete called', () => {
        const wrapper = shallow(<DocsItem doc={doc} orderServiceItem={orderServiceItem} />)

        findByTestAttr(wrapper, 'delete-btn').simulate('click')

        expect(mockHandleDelete).toBeCalled()
    })

})
