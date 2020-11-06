import {IDocument, IOrder, IServiceListItem} from '../retail/interfaces';

export const ORDER_DOCS_REQUEST = 'DOCS/ORDER_DOCS_REQUEST'
export const ORDER_DOCS_RESPONSE = 'DOCS/ORDER_DOCS_RESPONSE'

export const ORDER_SERVICE_ITEM_DOCS_REQUEST = 'DOCS/ORDER_SERVICE_ITEM_DOCS_REQUEST'
export const ORDER_SERVICE_ITEM_DOCS_RESPONSE = 'DOCS/ORDER_SERVICE_ITEM_DOCS_RESPONSE'

export const ALL_DOCS_REQUEST = 'DOCS/ALL_DOCS_REQUEST'
export const ALL_DOCS_RESPONSE = 'DOCS/ALL_DOCS_RESPONSE'

export interface IOrderDocsRequestAction {
    type: typeof ORDER_DOCS_REQUEST
    payload: IOrder
}

export interface IOrderResponseDocsAction {
    type: typeof ORDER_DOCS_RESPONSE
    payload: IDocument[]
}

export interface IOrderServiceItemDocsRequestAction {
    type: typeof ORDER_SERVICE_ITEM_DOCS_REQUEST
    payload: IServiceListItem
}

export interface IOrderServiceItemResponseDocsAction {
    type: typeof ORDER_SERVICE_ITEM_DOCS_RESPONSE
    payload: IDocument[]
}

export interface IAllDocsRequestAction {
    type: typeof ALL_DOCS_REQUEST
    payload: {
        order: IOrder
        orderServiceItem: IServiceListItem
    }
}

export interface IAllDocsResponseAction {
    type: typeof ALL_DOCS_RESPONSE
    payload: {
        orderDocs: IDocument[]
        orderServiceItemDocs: IDocument[]
    }
}

export type IDocsActionTypes = IOrderDocsRequestAction
    | IOrderResponseDocsAction
    | IOrderServiceItemDocsRequestAction
    | IOrderServiceItemResponseDocsAction
    | IAllDocsRequestAction
    | IAllDocsResponseAction
