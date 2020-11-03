import {useDispatch, useSelector} from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import {requestCitizenships} from '../store/retail/actions';
import {useCitizenships} from './useCitizenships';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

const mockUseSelector = useSelector as jest.Mock
const mockUseDispatch = useDispatch as jest.Mock
const mockDispatch = jest.fn()

describe('useCitizenships', () => {

    test('call dispatch and selector is right', () => {
        mockUseDispatch.mockImplementation(() => mockDispatch)
        mockUseSelector.mockImplementation(cb => cb({retail: {citizenships: 'test'}}))

        const {result} = renderHook(() => useCitizenships())

        expect(result.current).toBe('test')
        expect(mockDispatch).toHaveBeenCalledWith(requestCitizenships())
    })

})
