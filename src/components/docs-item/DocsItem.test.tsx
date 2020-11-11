import React from 'react';
import {useDocsItem} from './hooks'
import {shallow, ShallowWrapper} from 'enzyme';
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

const setUp = (isDeletingAllowed: boolean = true): ShallowWrapper => {
    return shallow(<DocsItem
        doc={doc}
        orderServiceItem={orderServiceItem}
        isDeletingAllowed={isDeletingAllowed}
    />)
}

describe('DocsItem component', () => {

    let wrapper: ShallowWrapper

    beforeEach(() => wrapper = setUp())

    test('handlerDelete called', () => {
        findByTestAttr(wrapper, 'delete-btn').simulate('click')

        expect(mockHandleDelete).toBeCalled()
    })

    test('delete btn not available for default docs', () => {
        wrapper = setUp(false)
        expect(findByTestAttr(wrapper, 'delete-btn').length).toBe(0)
    })

    test('delete btn available for uploaded docs', () => {
        expect(findByTestAttr(wrapper, 'delete-btn').length).toBe(1)
    })



})
