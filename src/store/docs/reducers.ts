import {IDocument} from '../retail/interfaces';
import {
    ALL_DOCS_RESPONSE,
    DELETE_DOC_RESPONSE,
    IDocsActionTypes,
    ORDER_DOCS_RESPONSE,
    ORDER_SERVICE_ITEM_DOCS_RESPONSE,
    UPLOAD_DOC_RESPONSE,
    UPLOAD_PROGRESS
} from './types';

export interface IDocsState {
    orderDocs: IDocument[]
    orderServiceItemDocs: IDocument[]
    uploadProgress: number
}

const docsState = {
    orderDocs: [],
    orderServiceItemDocs: [],
    uploadProgress: 0,
}

export default function docsReducer(state: IDocsState = docsState, action: IDocsActionTypes) {
    switch (action.type) {
        case ORDER_DOCS_RESPONSE:
            return {...state, orderDocs: action.payload}
        case ORDER_SERVICE_ITEM_DOCS_RESPONSE:
            return {...state, orderServiceItemDocs: action.payload}
        case ALL_DOCS_RESPONSE:
            return {...state, ...action.payload}
        case DELETE_DOC_RESPONSE:
            return {...state, orderServiceItemDocs: state.orderServiceItemDocs.filter(d => d.id === action.payload.id)}
        case UPLOAD_DOC_RESPONSE:
            return {...state, orderServiceItemDocs: [action.payload, ...state.orderServiceItemDocs]}
        case UPLOAD_PROGRESS:
            return {...state, uploadProgress: action.payload}
        default:
            return state
    }
}
