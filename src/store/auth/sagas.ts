import {call, put, takeEvery, select} from 'redux-saga/effects'
import history from '../../history';
import {
    IForgotPassRequest,
    ISignInRequest,
    ISignUpRequest,
    FORGOT_PASS_REQUEST,
    SIGN_UP_REQUEST,
    SIGN_IN_REQUEST, PROFILE_REQUEST
} from './types';
import {responseProfile, responseSignIn, responseSignUp} from './actions';
import AuthAPI, {authAPI} from '../../api/authAPI';
import {retailAPI} from '../../api/retailAPI';
import {startAction, stopAction} from '../ui/actions';
import Cookie from '../../services/Cookie';
import {IAuthSession, IForgotPassData, IProfile} from '../../interfaces/signUp';
import Storage from '../../services/Storage';
import {openSnackbar,} from '../app/actions';
import {IApi, SnackbarRole} from '../../interfaces/app';
import {getRetailBaseUrl} from '../app/selectros';


// const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))
// yield call(delay, 50)

export function* watchRequestSingUp(api: IApi) {
    yield takeEvery(SIGN_UP_REQUEST, requestSignUpWorker)
}

export function* watchRequestSignIn(api: IApi) {
    yield takeEvery(SIGN_IN_REQUEST, requestSignInWorker, api)
}

export function* watchRequestForgotPass(api: IApi) {
    yield takeEvery(FORGOT_PASS_REQUEST, requestForgotPassWorker)
}

export function* watchRequestProfile(api: IApi) {
    yield takeEvery(PROFILE_REQUEST, requestProfileWorker)
}

// TODO simplify code, too match duplication with sign in
function* requestSignUpWorker(action: ISignUpRequest) {
    try {
        yield put(startAction(action.type))
        const response = yield call([authAPI, authAPI.register], action.data)
        const authSession: IAuthSession = response.data;
        yield put(responseSignUp(authSession.user))

        Cookie.set('token', authSession.token, new Date(authSession.expired))
        Storage.set('user', authSession.user)

        const retailBaseUrl = yield select(getRetailBaseUrl)
        retailAPI.initiate(retailBaseUrl, authSession.token)

        history.push('/profile')
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    } finally {
        yield put(stopAction(action.type))
    }
}

function* requestSignInWorker(api: IApi, action: ISignInRequest) {
    try {
        yield put(startAction(action.type))
        const response = yield call([authAPI, authAPI.login], action.data)
        const authSession: IAuthSession = response.data
        yield put(responseSignIn(authSession.user))

        Cookie.set('token', authSession.token, new Date(authSession.expired))
        Storage.set('user', authSession.user)

        const retailBaseUrl = yield select(getRetailBaseUrl)
        retailAPI.initiate(retailBaseUrl, authSession.token)

        history.push('/profile')
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    } finally {
        yield put(stopAction(action.type))
    }
}

function* requestForgotPassWorker(action: IForgotPassRequest) {
    try {
        yield put(startAction(action.type))

        const response = yield call([authAPI, authAPI.resetPass], action.email)
        const forgotPassData: IForgotPassData = response.data

        if (forgotPassData.sendResult[0].status === 'sent') {
            yield put(openSnackbar('An email was set with reset instructions'))
        }

    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    } finally {
        yield put(stopAction(action.type))
    }
}

function* requestProfileWorker() {
    try {
        const response = yield call([authAPI, authAPI.fetchProfile])
        const profile: IProfile = response.data
        yield put(responseProfile(profile))
    } catch (e) {
        yield put(openSnackbar(e.message, {role: SnackbarRole.ERROR, delay: 0}))
    }
}
