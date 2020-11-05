import {useDispatch, useSelector} from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import order from '../../mocks/data/order.json'
import {requestOrderServiceItemDocs} from '../store/docs/actions';
import {useOrderServiceItemDocs} from './useOrderServiceItemDocs';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

const mockUseSelector = useSelector as jest.Mock
const mockUseDispatch = useDispatch as jest.Mock
const mockDispatch = jest.fn()

describe('useOrderServiceItemDocs', () => {

    test('call dispatch and selector is right', () => {
        mockUseDispatch.mockImplementation(() => mockDispatch)
        mockUseSelector.mockImplementation(cb => cb({docs: {orderServiceItemDocs: 'test'}}))

        const {result} = renderHook(() => useOrderServiceItemDocs(order.service_list[0]))

        expect(result.current).toBe('test')
        expect(mockDispatch).toHaveBeenCalledWith(requestOrderServiceItemDocs(order.service_list[0]))
    })

})
