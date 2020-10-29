import AuthAPI from '../api/authAPI';
import RetailAPI from '../api/retailAPI';

export interface IAppState {
    snackbars: Array<ISnackbar>
    translations: ITranslations
    initOptions: IInitOptions
}

export interface ITranslations {
    [key: string]: string | {}
}

export interface ISnackbar {
    id: number
    role: SnackbarRole
    delay: number
    message: string
}

export enum SnackbarRole {
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
}

export interface IInitOptions {
    locale: string
    authUrl: string
    retailUrl: string
}

export interface IApi {
    auth: AuthAPI
    retail: RetailAPI
}

export enum RoutesEnum {
    HOME = '/',
    PROFILE = '/profile',
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
}
