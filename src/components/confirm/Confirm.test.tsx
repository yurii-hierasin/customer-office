import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Confirm from './Confirm';
import {findByTestAttr} from '../../setupTests';

const mockHandleAgree = jest.fn()

describe('Confirm component', () => {

    let wrapper: ShallowWrapper

    beforeEach(() => wrapper = shallow(<Confirm bodyText={'bodyText'} handleAgree={mockHandleAgree} />))

    test('click on close btn mean CANCEL', () => {
        wrapper.find('ModalHeader').simulate('click')

        expect(mockHandleAgree).toBeCalledWith(false)
    })

    test('click on cancel button return false', () => {
        findByTestAttr(wrapper, 'cancel-btn').simulate('click')

        expect(mockHandleAgree).toHaveBeenCalledWith(false)
    })

    test('click on ok button return true', () => {
        findByTestAttr(wrapper, 'ok-btn').simulate('click')

        expect(mockHandleAgree).toHaveBeenCalledWith(true)
    })

})
