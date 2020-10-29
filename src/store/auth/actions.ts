import {
    FORGOT_PASS_REQUEST,
    IAuthActionTypes,
    ISignInRequest,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS
} from './types';
import {ISignInData, ISignUpData, IUser} from '../../interfaces/signUp';

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
