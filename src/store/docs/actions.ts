import {
    IDocsActionTypes,
    ORDER_DOCS_REQUEST,
    ORDER_DOCS_RESPONSE,
    ORDER_SERVICE_ITEM_DOCS_REQUEST,
    ORDER_SERVICE_ITEM_DOCS_RESPONSE
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
