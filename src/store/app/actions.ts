import {
    IAppActionTypes,
    ISnackbarAction,
    ITranslationsRequestAction,
    ITranslationsSuccessAction,
    CLOSE_SNACKBAR,
    OPEN_SNACKBAR,
    TRANSLATIONS_REQUEST,
    TRANSLATIONS_SUCCESS,
    UPDATE_INIT_OPTIONS,
} from './types';
import {IInitOptions, ISnackbar, SnackbarRole} from '../../interfaces/app';

export const updateInitOptions = (options: IInitOptions): IAppActionTypes => ({
    type: UPDATE_INIT_OPTIONS,
    payload: options
})

export const openSnackbar = (
    message: string,
    {role = SnackbarRole.INFO, delay = 3000}: { role?: SnackbarRole, delay?: number } = {}
): ISnackbarAction => ({
    type: OPEN_SNACKBAR,
    snackbar: {
        id: new Date().getTime(),
        role,
        delay,
        message
    }
})

export const closeSnackbar = (snackbar: ISnackbar): ISnackbarAction => ({
    type: CLOSE_SNACKBAR,
    snackbar
})

export const requestTranslations = (locale: string): ITranslationsRequestAction => ({
    type: TRANSLATIONS_REQUEST,
    payload: locale,
})

export const successTranslations = (translations: { [key: string]: string }): ITranslationsSuccessAction => ({
    type: TRANSLATIONS_SUCCESS,
    payload: translations,
})
