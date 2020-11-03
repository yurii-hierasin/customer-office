import {useDispatch, useSelector} from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import {requestDestinations} from '../store/retail/actions';
import {useDestinations} from './useDestinations';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

const mockUseSelector = useSelector as jest.Mock
const mockUseDispatch = useDispatch as jest.Mock
const mockDispatch = jest.fn()

describe('useDestinations', () => {

    test('call dispatch and selector is right', () => {
        mockUseDispatch.mockImplementation(() => mockDispatch)
        mockUseSelector.mockImplementation(cb => cb({retail: {destinations: 'test'}}))

        const {result} = renderHook(() => useDestinations())

        expect(result.current).toBe('test')
        expect(mockDispatch).toHaveBeenCalledWith(requestDestinations())
    })

})
