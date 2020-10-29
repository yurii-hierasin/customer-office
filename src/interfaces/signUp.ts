import {IAppState} from './app';

export interface IRootState {
    app: IAppState
    auth: IAuthState
    ui: IUIState
}

export interface IAuthState {
    user: null | IUser
}

export interface IAuthSession {
    token: string
    expired: string
    user: IUser
}

export interface IUser {
    id: number
    account_number: number
    created: string
    first_name: string
    last_name: string
}

export interface ISignUpData {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
}

export interface ISignInData {
    email: string
    password: string
}

export interface IForgotPassData {
    token: string
    sendResult: [
        {
            email: string
            status: string // 'sent'
            _id: string
            reject_reason: string
        }
    ]
}

interface ILoaderAction {
    name: string
    params: any
}

export interface IUIState {
    loader: {
        actions: Array<ILoaderAction>
    }
}
