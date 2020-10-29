import {
    FORGOT_PASS_REQUEST,
    IAuthActionTypes,
    ISignInRequest,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS
} from './types';
import {IProfile, ISignInData, ISignUpData, IUser} from '../../interfaces/signUp';

export const requestSignUp = (data: ISignUpData): IAuthActionTypes => ({
    type: SIGN_UP_REQUEST,
    data,
})

export const responseSignUp = (user: IUser): IAuthActionTypes => ({
    type: SIGN_UP_SUCCESS,
    user,
})

export const requestSingIn = (data: ISignInData): ISignInRequest => ({
    type: SIGN_IN_REQUEST,
    data,
})

export const responseSignIn = (user: IUser): IAuthActionTypes => ({
    type: SIGN_IN_SUCCESS,
    user
})

export const requestForgotPassword = (email: string): IAuthActionTypes => ({
    type: FORGOT_PASS_REQUEST,
    email
})

export const requestProfile = (): IAuthActionTypes => ({
    type: PROFILE_REQUEST,
    payload: null,
})

export const responseProfile = (profile: IProfile): IAuthActionTypes => ({
    type: PROFILE_SUCCESS,
    payload: profile,
})
