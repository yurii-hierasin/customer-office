import {call, put, takeEvery} from 'redux-saga/effects';
import {IApi, SnackbarRole} from '../../interfaces/app';
import {
    IOrderDocsRequestAction,
    IOrderServiceItemDocsRequestAction,
    ORDER_DOCS_REQUEST, ORDER_SERVICE_ITEM_DOCS_REQUEST
} from './types';
import {retailAPI} from '../../api/retailAPI';
import {IDocument} from '../retail/interfaces';
import {responseOrderDocs, responseOrderServiceItemDocs} from './actions';
import {openSnackbar} from '../app/actions';


export function* watchRequestOrderDocs(api: IApi) {
    yield takeEvery(ORDER_DOCS_REQUEST, requestOrderDocsWorker, api)
}

function* requestOrderDocsWorker(api: IApi, action: IOrderDocsRequestAction) {
    try {
        const response = yield call([retailAPI, retailAPI.fetchOrderDocs], action.payload)
        const docs: IDocument[] = response.data
        yield put(responseOrderDocs(docs))
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    }
}


export function* watchRequestOrderServiceItemDocs(api: IApi) {
    yield takeEvery(ORDER_SERVICE_ITEM_DOCS_REQUEST, requestOrderServiceItemDocsWorker, api)
}

function* requestOrderServiceItemDocsWorker(api: IApi, action: IOrderServiceItemDocsRequestAction) {
    try {
        const response = yield call([retailAPI, retailAPI.fetchOrderServiceItemDocs], action.payload)
        const docs: IDocument[] = response.data
        yield put(responseOrderServiceItemDocs(docs))
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    }
}
