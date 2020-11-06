import {call, put, takeEvery, all} from 'redux-saga/effects';
import {IApi, SnackbarRole} from '../../interfaces/app';
import {
    ALL_DOCS_REQUEST, IAllDocsRequestAction,
    IOrderDocsRequestAction,
    IOrderServiceItemDocsRequestAction,
    ORDER_DOCS_REQUEST, ORDER_SERVICE_ITEM_DOCS_REQUEST
} from './types';
import {retailAPI} from '../../api/retailAPI';
import {IDocument} from '../retail/interfaces';
import {responseAllDocs, responseOrderDocs, responseOrderServiceItemDocs} from './actions';
import {openSnackbar} from '../app/actions';
import {startAction, stopAction} from '../ui/actions';


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


export function* watchRequestAllDocs(api: IApi) {
    yield takeEvery(ALL_DOCS_REQUEST, requestAllDocsWorker, api)
}

// @ts-ignore
function* requestAllDocsWorker(api: IApi, action: IAllDocsRequestAction) {
    try {
        yield put(startAction(action.type))
        const [orderDocs, orderServiceItemDocs] = yield all([
            call([retailAPI, retailAPI.fetchOrderDocs], action.payload.order),
            call([retailAPI, retailAPI.fetchOrderServiceItemDocs], action.payload.orderServiceItem)
        ])
        yield put(responseAllDocs(orderDocs.data, orderServiceItemDocs.data))
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    } finally {
        yield put(stopAction(action.type))
    }
}
