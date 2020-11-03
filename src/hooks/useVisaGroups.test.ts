import {useDispatch, useSelector} from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import {requestVisaGroups} from '../store/retail/actions';
import {useVisaGroups} from './useVisaGroups';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

const mockUseSelector = useSelector as jest.Mock
const mockUseDispatch = useDispatch as jest.Mock
const mockDispatch = jest.fn()

describe('useVisaGroups', () => {

    test('call dispatch and selector is right', () => {
        mockUseDispatch.mockImplementation(() => mockDispatch)
        mockUseSelector.mockImplementation(cb => cb({retail: {visaGroups: 'test'}}))

        const {result} = renderHook(() => useVisaGroups())

        expect(result.current).toBe('test')
        expect(mockDispatch).toHaveBeenCalledWith(requestVisaGroups())
    })

})
