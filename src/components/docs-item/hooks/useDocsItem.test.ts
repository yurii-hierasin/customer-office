import {renderHook, act} from '@testing-library/react-hooks'
import {useDocsItem} from './index';
import {useDispatch, useSelector} from 'react-redux';
import {requestDeleteDoc} from '../../../store/docs/actions';
import docs from '../../../../mocks/data/order-item-files.json';
import order from '../../../../mocks/data/order.json';

const doc = docs[0]
const orderServiceItem = order.service_list[0]

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

const mockUseSelector = useSelector as jest.Mock
const mockUseDispatch = useDispatch as jest.Mock
const mockDispatch = jest.fn()

describe('useDocsItem hook', () => {

    test('dateTimeService got right locale', () => {
        const state = {app: {initOptions: {locale: 'en-US'}}}
        mockUseSelector.mockImplementation(cb => cb(state))
        const {result} = renderHook(() => useDocsItem(doc, orderServiceItem))

        expect(result.current.dateTimeService.getLocale()).toEqual(state.app.initOptions.locale)
    })

    test('handleDelete click', () => {
        const {result} = renderHook(() => useDocsItem(doc, orderServiceItem))
        expect(result.current.showModal).toBeFalsy()

        act(() => {
            result.current.handleDelete()
        })

        expect(result.current.showModal).toBeTruthy()
    })

    describe('handleModalAgree click', () => {

        test('close modal window', () => {
            const {result} = renderHook(() => useDocsItem(doc, orderServiceItem))
            act(() => result.current.handleDelete())
            expect(result.current.showModal).toBeTruthy()

            act(() => result.current.handleModalAgree(false))

            expect(result.current.showModal).toBeFalsy()
        })

        test('avoid delete doc request for NO', () => {
            mockUseDispatch.mockImplementation(() => mockDispatch)
            const {result} = renderHook(() => useDocsItem(doc, orderServiceItem))

            act(() => result.current.handleModalAgree(false))

            expect(mockDispatch).toBeCalledTimes(0)
        })

        test('run delete doc request for YES', () => {
            mockUseDispatch.mockImplementation(() => mockDispatch)
            const {result} = renderHook(() => useDocsItem(doc, orderServiceItem))

            act(() => result.current.handleModalAgree(true))

            expect(mockDispatch).toHaveBeenCalledWith(requestDeleteDoc(doc, orderServiceItem))
        })

    })

})
