import {call, put, takeEvery} from 'redux-saga/effects';
import {startAction, stopAction} from '../ui/actions';
import {openSnackbar, successTranslations} from './actions';
import {IApi, SnackbarRole} from '../../interfaces/app';
import {ITranslationsRequestAction, TRANSLATIONS_REQUEST} from './types';
import {retailAPI} from '../../api/retailAPI';

export function* watchTranslationsRequest(api: IApi) {
    yield takeEvery(TRANSLATIONS_REQUEST, translationsRequestWorker)
}

function* translationsRequestWorker(action: ITranslationsRequestAction) {
    try {
        yield put(startAction(action.type))
        const response = yield call([retailAPI, retailAPI.fetchTranslations], action.payload)
        yield put(successTranslations(response.data))
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    } finally {
        yield put(stopAction(action.type))
    }
}
