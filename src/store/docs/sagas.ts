import {call, put, takeEvery, all, take, fork} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga'
import {IApi, SnackbarRole} from '../../interfaces/app';
import {
    ALL_DOCS_REQUEST, DELETE_DOC_REQUEST, IAllDocsRequestAction, IDeleteDocRequestAction,
    IOrderDocsRequestAction,
    IOrderServiceItemDocsRequestAction, IUploadDocRequestAction,
    ORDER_DOCS_REQUEST, ORDER_SERVICE_ITEM_DOCS_REQUEST, UPLOAD_DOC_REQUEST
} from './types';
import {retailAPI} from '../../api/retailAPI';
import {IDocument, IServiceListItem} from '../retail/interfaces';
import {
    responseAllDocs, responseDeleteDoc,
    responseOrderDocs,
    responseOrderServiceItemDocs,
    responseUploadDoc,
    uploadProgress
} from './actions';
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


export function* watchRequestDeleteDoc(api: IApi) {
    yield takeEvery(DELETE_DOC_REQUEST, requestDeleteDocWorker, api)
}

function* requestDeleteDocWorker(api: IApi, action: IDeleteDocRequestAction) {
    try {
        yield put(startAction(action.type))
        const response = yield call(
            [retailAPI, retailAPI.deleteOrderItemDocument],
            action.payload.orderServiceItem.order_id,
            action.payload.orderServiceItem.id,
            action.payload.doc
        )
        yield put(responseDeleteDoc(action.payload.doc))

    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    } finally {
        yield put(stopAction(action.type))
    }
}



export function* watchRequestUploadDoc(api: IApi) {
    yield takeEvery(UPLOAD_DOC_REQUEST, requestUploadDocWorker, api)
}

// @ts-ignore
function* requestUploadDocWorker(api: IApi, action: IUploadDocRequestAction) {
    try {
        yield put(startAction(action.type))
        const item = action.payload.orderServiceItem
        const [uploadPromise, chan] = yield call(createUploader, action.payload.formData, item)
        yield fork(uploadProgressWatcher, chan)
        const response = yield call(() => uploadPromise)

        yield put(responseUploadDoc(response.data))
        yield put(uploadProgress(0))

    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    } finally {
        yield put(stopAction(action.type))
    }
}


function createUploader(files: any, item: IServiceListItem) {
    let emit: any;
    const chan = eventChannel((emitter) => {
        emit = emitter;
        return () => {};
    });
    // @ts-ignore
    const uploadProgressCb = ({ total, loaded }) => {
        const percentage = Math.round((loaded * 100) / total)
        emit(percentage)

        if (percentage === 100) {
            emit(END)
        }
    }

    const config = {
        onUploadProgress: uploadProgressCb
    }

    const uploadPromise = retailAPI.add(item.order_id, item.id, files, config)
    return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan: any) {
    while (true) {
        const progress = yield take(chan);
        yield put(uploadProgress(progress));
    }
}
