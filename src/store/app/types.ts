import {IInitOptions, ISnackbar} from '../../interfaces/app';

export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const TRANSLATIONS_REQUEST = 'TRANSLATIONS_REQUEST'
export const TRANSLATIONS_SUCCESS = 'TRANSLATIONS_SUCCESS'
export const UPDATE_INIT_OPTIONS = 'UPDATE_INIT_OPTIONS'

export interface IUpdateInitOptionsAction {
    type: typeof UPDATE_INIT_OPTIONS
    payload: IInitOptions
}

export interface ISnackbarAction {
    type: typeof OPEN_SNACKBAR | typeof CLOSE_SNACKBAR
    snackbar: ISnackbar
}

export interface ITranslationsRequestAction {
    type: typeof TRANSLATIONS_REQUEST
    payload: string
}

export interface ITranslationsSuccessAction {
    type: typeof TRANSLATIONS_SUCCESS
    payload: {[key: string]: string}
}

export type IAppActionTypes = IUpdateInitOptionsAction
    | ISnackbarAction
    | ITranslationsRequestAction
    | ITranslationsSuccessAction
