import {renderHook} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {requestOrders} from '../store/retail/actions';
import {useOrders} from './useOrders';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

const mockUseSelector = useSelector as jest.Mock
const mockUseDispatch = useDispatch as jest.Mock
const mockDispatch = jest.fn()

describe('useOrders', () => {

    test('call dispatch and selector is right', () => {
        mockUseDispatch.mockImplementation(() => mockDispatch)
        mockUseSelector.mockImplementation(cb => cb({retail: {orders: 'test'}}))

        const {result} = renderHook(() => useOrders())

        expect(result.current).toBe('test')
        expect(mockDispatch).toHaveBeenCalledWith(requestOrders())
    })

})
