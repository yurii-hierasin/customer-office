import {
    CITIZENSHIPS_SUCCESS,
    DESTINATIONS_SUCCESS,
    IRetailActionTypes,
    ORDERS_SUCCESS,
    VISA_GROUPS_SUCCESS
} from './types';
import {IRetailState} from './interfaces';

const retailState: IRetailState = {
    orders: [],
    visaGroups: [],
    destinations: [],
    citizenships: [],
}

export default function retailReducer(state: IRetailState = retailState, action: IRetailActionTypes) {
    switch (action.type) {
        case ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload
            }
        case VISA_GROUPS_SUCCESS:
            return {
                ...state,
                visaGroups: action.payload
            }
        case DESTINATIONS_SUCCESS:
            return {
                ...state,
                destinations: action.payload
            }
        case CITIZENSHIPS_SUCCESS:
            return {
                ...state,
                citizenships: action.payload
            }
        default:
            return state
    }
}
