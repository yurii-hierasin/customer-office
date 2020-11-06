import {IDocument} from '../retail/interfaces';
import {ALL_DOCS_RESPONSE, IDocsActionTypes, ORDER_DOCS_RESPONSE, ORDER_SERVICE_ITEM_DOCS_RESPONSE} from './types';

export interface IDocsState {
    orderDocs: IDocument[]
    orderServiceItemDocs: IDocument[]
}

const docsState = {
    orderDocs: [],
    orderServiceItemDocs: [],
}

export default function docsReducer(state: IDocsState = docsState, action: IDocsActionTypes) {
    switch (action.type) {
        case ORDER_DOCS_RESPONSE:
            return {...state, orderDocs: action.payload}
        case ORDER_SERVICE_ITEM_DOCS_RESPONSE:
            return {...state, orderServiceItemDocs: action.payload}
        case ALL_DOCS_RESPONSE:
            return {...state, ...action.payload}
        default:
            return state
    }
}
