import {IDocument, IOrder, IServiceListItem} from '../retail/interfaces';

export const ORDER_DOCS_REQUEST = 'FILE/ORDER_DOCS_REQUEST'
export const ORDER_DOCS_RESPONSE = 'FILE/ORDER_DOCS_RESPONSE'

export const ORDER_SERVICE_ITEM_DOCS_REQUEST = 'FILE/ORDER_SERVICE_ITEM_DOCS_REQUEST'
export const ORDER_SERVICE_ITEM_DOCS_RESPONSE = 'FILE/ORDER_SERVICE_ITEM_DOCS_RESPONSE'

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

export type IDocsActionTypes = IOrderDocsRequestAction
    | IOrderResponseDocsAction
    | IOrderServiceItemDocsRequestAction
    | IOrderServiceItemResponseDocsAction
