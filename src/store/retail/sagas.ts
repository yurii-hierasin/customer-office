import {call, put, takeEvery} from 'redux-saga/effects';
import {openSnackbar} from '../app/actions';
import {IApi, SnackbarRole} from '../../interfaces/app';
import {retailAPI} from '../../api/retailAPI';
import {ICitizenship, IDestination, IOrder, IVisaGroup} from './interfaces';
import {responseCitizenships, responseDestinations, responseOrders, responseVisaGroups} from './actions';
import {CITIZENSHIPS_REQUEST, DESTINATIONS_REQUEST, ORDERS_REQUEST, VISA_GROUPS_REQUEST} from './types';

export function* watchRequestOrders(api: IApi) {
    yield takeEvery(ORDERS_REQUEST, requestOrdersWorker, api)
}

function* requestOrdersWorker(api: IApi) {
    try {
        const response = yield call([retailAPI, retailAPI.fetchOrders])
        const orders: IOrder[] = response.data
        yield put(responseOrders(orders))
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    }
}


export function* watchRequestVisaGroups(api: IApi) {
    yield takeEvery(VISA_GROUPS_REQUEST, requestVisaGroupsWorker, api)
}

function* requestVisaGroupsWorker(api: IApi) {
    try {
        const response = yield call([retailAPI, retailAPI.fetchVisaGroups])
        const visaGroups: IVisaGroup[] = response.data
        yield put(responseVisaGroups(visaGroups))
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    }
}


export function* watchRequestDestinations(api: IApi) {
    yield takeEvery(DESTINATIONS_REQUEST, requestDestinationsWorker, api)
}

function* requestDestinationsWorker(api: IApi) {
    try {
        const response = yield call([retailAPI, retailAPI.fetchDestinations])
        const destinations: IDestination[] = response.data
        yield put(responseDestinations(destinations))
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    }
}


export function* watchRequestCitizenships(api: IApi) {
    yield takeEvery(CITIZENSHIPS_REQUEST, requestCitizenshipsWorker, api)
}

function* requestCitizenshipsWorker(api: IApi) {
    try {
        const response = yield call([retailAPI, retailAPI.fetchCitizenships])
        const citizenships: ICitizenship[] = response.data
        yield put(responseCitizenships(citizenships))
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    }
}
