import {ICitizenship, IDestination, IOrder, IVisaGroup} from './interfaces';

export const ORDERS_REQUEST = 'RETAIL/ORDERS_REQUEST'
export const ORDERS_SUCCESS = 'RETAIL/ORDERS_SUCCESS'

export const VISA_GROUPS_REQUEST = 'RETAIL/VISA_GROUPS_REQUEST'
export const VISA_GROUPS_SUCCESS = 'RETAIL/VISA_GROUPS_SUCCESS'

export const DESTINATIONS_REQUEST = 'RETAIL/DESTINATIONS_REQUEST'
export const DESTINATIONS_SUCCESS = 'RETAIL/DESTINATIONS_SUCCESS'

export const CITIZENSHIPS_REQUEST = 'RETAIL/CITIZENSHIPS_REQUEST'
export const CITIZENSHIPS_SUCCESS = 'RETAIL/CITIZENSHIPS_SUCCESS'

export interface IOrdersRequestAction {
    type: typeof ORDERS_REQUEST
    payload: null
}

export interface IOrdersSuccessAction {
    type: typeof ORDERS_SUCCESS
    payload: IOrder[]
}

export interface IVisaGroupsRequestAction {
    type: typeof VISA_GROUPS_REQUEST
    payload: null
}

export interface IVisaGroupsSuccessAction {
    type: typeof VISA_GROUPS_SUCCESS
    payload: IVisaGroup[]
}

export interface IDestinationsRequestAction {
    type: typeof DESTINATIONS_REQUEST
    payload: null
}

export interface IDestinationsResponseAction {
    type: typeof DESTINATIONS_SUCCESS
    payload: IDestination[]
}

export interface ICitizenshipRequestAction {
    type: typeof CITIZENSHIPS_REQUEST
    payload: null
}

export interface ICitizenshipResponseAction {
    type: typeof CITIZENSHIPS_SUCCESS
    payload: ICitizenship[]
}

export type IRetailActionTypes = IOrdersRequestAction
    | IOrdersSuccessAction
    | IVisaGroupsRequestAction
    | IVisaGroupsSuccessAction
    | IDestinationsRequestAction
    | IDestinationsResponseAction
    | ICitizenshipRequestAction
    | ICitizenshipResponseAction
