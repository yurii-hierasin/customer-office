import {ISignInData, ISignUpData, IUser} from '../../interfaces/signUp';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'

export const FORGOT_PASS_REQUEST = 'FORGOT_PASS_REQUEST'

export interface ISignUpRequest {
    type: typeof SIGN_UP_REQUEST
    data: ISignUpData
}

interface ISignUpResponse {
    type: typeof SIGN_UP_SUCCESS
    user: IUser
}

export interface ISignInRequest {
    type: typeof SIGN_IN_REQUEST
    data: ISignInData
}

interface ISignInResponse {
    type: typeof SIGN_IN_SUCCESS
    user: IUser
}

export interface IForgotPassRequest {
    type: typeof FORGOT_PASS_REQUEST
    email: string
}

export type IAuthActionTypes = ISignUpRequest
    | ISignUpResponse
    | ISignInRequest
    | ISignInResponse
    | IForgotPassRequest
