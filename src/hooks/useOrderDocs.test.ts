import {useDispatch, useSelector} from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import {useOrderDocs} from './useOrderDocs';
import order from '../../mocks/data/order.json'
import {requestOrderDocs} from '../store/docs/actions';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

const mockUseSelector = useSelector as jest.Mock
const mockUseDispatch = useDispatch as jest.Mock
const mockDispatch = jest.fn()

describe('useOrderDocs', () => {

    test('call dispatch and selector is right', () => {
        mockUseDispatch.mockImplementation(() => mockDispatch)
        mockUseSelector.mockImplementation(cb => cb({docs: {orderDocs: 'test'}}))

        const {result} = renderHook(() => useOrderDocs(order))

        expect(result.current).toBe('test')
        expect(mockDispatch).toHaveBeenCalledWith(requestOrderDocs(order))
    })

})
