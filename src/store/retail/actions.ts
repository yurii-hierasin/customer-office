import {
    CITIZENSHIPS_REQUEST, CITIZENSHIPS_SUCCESS,
    DESTINATIONS_REQUEST,
    DESTINATIONS_SUCCESS,
    IRetailActionTypes,
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    VISA_GROUPS_REQUEST,
    VISA_GROUPS_SUCCESS
} from './types';
import {ICitizenship, IDestination, IOrder, IVisaGroup} from './interfaces';

export const requestOrders = (): IRetailActionTypes => ({
    type: ORDERS_REQUEST,
    payload: null,
})

export const responseOrders = (orders: IOrder[]): IRetailActionTypes => ({
    type: ORDERS_SUCCESS,
    payload: orders,
})

export const requestVisaGroups = (): IRetailActionTypes => ({
    type: VISA_GROUPS_REQUEST,
    payload: null,
})

export const responseVisaGroups = (groups: IVisaGroup[]): IRetailActionTypes => ({
    type: VISA_GROUPS_SUCCESS,
    payload: groups,
})

export const requestDestinations = (): IRetailActionTypes => ({
    type: DESTINATIONS_REQUEST,
    payload: null,
})

export const responseDestinations = (destinations: IDestination[]): IRetailActionTypes => ({
    type: DESTINATIONS_SUCCESS,
    payload: destinations,
})

export const requestCitizenships = (): IRetailActionTypes => ({
    type: CITIZENSHIPS_REQUEST,
    payload: null,
})

export const responseCitizenships = (citizenships: ICitizenship[]): IRetailActionTypes => ({
    type: CITIZENSHIPS_SUCCESS,
    payload: citizenships,
})
