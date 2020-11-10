import {
    ALL_DOCS_REQUEST,
    ALL_DOCS_RESPONSE,
    DELETE_DOC_REQUEST,
    DELETE_DOC_RESPONSE,
    IDocsActionTypes,
    ORDER_DOCS_REQUEST,
    ORDER_DOCS_RESPONSE,
    ORDER_SERVICE_ITEM_DOCS_REQUEST,
    ORDER_SERVICE_ITEM_DOCS_RESPONSE,
    UPLOAD_DOC_REQUEST,
    UPLOAD_DOC_RESPONSE,
    UPLOAD_PROGRESS
} from './types';
import {IDocument, IOrder, IServiceListItem} from '../retail/interfaces';

export const requestOrderDocs = (order: IOrder): IDocsActionTypes => ({
    type: ORDER_DOCS_REQUEST,
    payload: order
})

export const responseOrderDocs = (docs: IDocument[]): IDocsActionTypes => ({
    type: ORDER_DOCS_RESPONSE,
    payload: docs
})

export const requestOrderServiceItemDocs = (orderServiceItem: IServiceListItem): IDocsActionTypes => ({
    type: ORDER_SERVICE_ITEM_DOCS_REQUEST,
    payload: orderServiceItem
})

export const responseOrderServiceItemDocs = (docs: IDocument[]): IDocsActionTypes => ({
    type: ORDER_SERVICE_ITEM_DOCS_RESPONSE,
    payload: docs
})

export const requestAllDocs = (order: IOrder, orderServiceItem: IServiceListItem): IDocsActionTypes => ({
    type: ALL_DOCS_REQUEST,
    payload: {
        order,
        orderServiceItem
    }
})

export const responseAllDocs = (orderDocs: IDocument[], orderServiceItemDocs: IDocument[]): IDocsActionTypes => ({
    type: ALL_DOCS_RESPONSE,
    payload: {
        orderDocs,
        orderServiceItemDocs
    }
})

export const requestDeleteDoc = (doc: IDocument, orderServiceItem: IServiceListItem): IDocsActionTypes => ({
    type: DELETE_DOC_REQUEST,
    payload: {
        doc,
        orderServiceItem
    }
})

export const responseDeleteDoc = (doc: IDocument): IDocsActionTypes => ({
    type: DELETE_DOC_RESPONSE,
    payload: doc
})

export const requestUploadDoc = (formData: FormData, orderServiceItem: IServiceListItem): IDocsActionTypes => ({
    type: UPLOAD_DOC_REQUEST,
    payload: {
        formData,
        orderServiceItem
    }
})

export const responseUploadDoc = (doc: IDocument): IDocsActionTypes => ({
    type: UPLOAD_DOC_RESPONSE,
    payload: doc
})

export const uploadProgress = (progress: number): IDocsActionTypes => ({
    type: UPLOAD_PROGRESS,
    payload: progress
})
