import React, {useRef} from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import DocsModal from './DocsModal';
import order from '../../../mocks/data/order.json';
import orderDocs from '../../../mocks/data/order-files.json'
import orderServiceItemDocs from '../../../mocks/data/order-item-files.json'
import {useDispatch, useSelector} from 'react-redux';
import {useAllDocs} from '../../hooks/useAllDocs';
import {findByTestAttr} from '../../setupTests';
import {DocTypesEnum} from '../../store/retail/interfaces';
import {ALL_DOCS_REQUEST, IDocsActionTypes, UPLOAD_DOC_REQUEST} from '../../store/docs/types';
import DocumentsService from '../../services/documents.service';
import {rootReducer} from '../../store';
import {createStore} from 'redux'

const click = jest.fn()

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}))
jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});
jest.mock('../../hooks/useAllDocs')

const mockUseSelector = useSelector as jest.Mock
const mockUseDispatch = useDispatch as jest.Mock
const mockUseRef = useRef as jest.Mock
const mockUseAllDocs = useAllDocs as jest.Mock

mockUseAllDocs.mockReturnValue({
    orderDocs,
    orderServiceItemDocs
})

const mockGetByType = jest.fn()
const mockSimulateDownloadEachDoc = jest.fn()
const mockDocumentsService = {
    getByType: mockGetByType,
    simulateDownloadEachDoc: mockSimulateDownloadEachDoc,
}

const setUp = (documentsService?: any): ShallowWrapper => {
    return shallow(
        <DocsModal
            order={order}
            orderServiceItem={order.service_list[0]}
            handleClose={() => {
            }}
            documentsService={documentsService || new DocumentsService()}
        />
    )
}

describe('DocsModal component', () => {

    let wrapper: ShallowWrapper

    beforeEach(() => {
        mockUseDispatch.mockClear()
        wrapper = setUp()
    })

    test('should render title', () => {
        expect(wrapper.text()).toContain('Documents management')
    })

    test('should render one uploaded document', () => {
        expect(findByTestAttr(wrapper, `doc-type-${DocTypesEnum.uploaded}`).find('DocsItem').length).toEqual(1)
    })

    test('should render bundle of default documents', () => {
        expect(findByTestAttr(wrapper, `doc-type-${DocTypesEnum.default}`).find('DocsItem').length).toEqual(4)
    })

    test('should dispatch upload document action on btn click', () => {
        mockUseDispatch.mockClear()
        let dispatchedAction: IDocsActionTypes
        mockUseDispatch.mockImplementation(() => {
            return (action: IDocsActionTypes) => {
                dispatchedAction = action
            }
        })

        wrapper = setUp()

        findByTestAttr(wrapper, 'upload-ugly-btn').simulate('change', {
            target: {
                files: [
                    new File([''], 'test.pdf', {type: 'application/pdf'})
                ]
            }
        })

        // @ts-ignore
        expect(dispatchedAction.type).toEqual(UPLOAD_DOC_REQUEST)
    })

    test('should not dispatch upload document action on file dialog cancel', () => {
        const dispatch = jest.fn()
        mockUseDispatch.mockImplementation(() => dispatch)

        wrapper = setUp()

        findByTestAttr(wrapper, 'upload-ugly-btn').simulate('change', {
            target: {
                files: []
            }
        })
        expect(dispatch).toBeCalledTimes(0)
    })

    test('should ref onClick called after beautiful btn onClick', () => {
        click.mockClear()
        click.mockImplementation(() => {
        })
        mockUseRef.mockClear()
        mockUseRef.mockReturnValueOnce({current: {click}})
        wrapper = setUp()

        findByTestAttr(wrapper, 'upload-beautiful-btn').simulate('click')
        expect(click).toBeCalledTimes(1)
    })

    test('should run upload all documents', () => {
        mockGetByType.mockReturnValue([])
        wrapper = setUp(mockDocumentsService)
        findByTestAttr(wrapper, 'download-all-btn').simulate('click')

        expect(mockSimulateDownloadEachDoc).toBeCalled()
    })

    test('should not render spinner for loaded data', () => {
        expect(wrapper.find('Spinner').length).toEqual(0)
    })

    test('should show spinner during data loading', () => {
        const store = createStore(rootReducer)
        const state = store.getState()

        state.ui.loader.actions = [{name: ALL_DOCS_REQUEST}]

        mockUseSelector.mockImplementation(callback => {
            return callback(state);
        });

        wrapper = setUp()

        expect(wrapper.find('Spinner').length).toEqual(1)
    })

    test('should show progress bar during document upload', () => {
        const store = createStore(rootReducer)
        const state = store.getState()

        state.ui.loader.actions = [{name: UPLOAD_DOC_REQUEST}]

        mockUseSelector.mockImplementation(callback => {
            return callback(state);
        });

        wrapper = setUp()

        expect(wrapper.find('ProgressBar').length).toEqual(1)
    })

})
