import {CLOSE_SNACKBAR, IAppActionTypes, OPEN_SNACKBAR, TRANSLATIONS_SUCCESS, UPDATE_INIT_OPTIONS} from './types';
import {IAppState, ISnackbar} from '../../interfaces/app';

const appState: IAppState = {
    snackbars: [],
    translations: {},
    initOptions: {
        locale: 'en',
        authUrl: '',
        retailUrl: '',
    },
}

export default function appReducer(state = appState, action: IAppActionTypes): IAppState {
    switch (action.type) {
        case UPDATE_INIT_OPTIONS:
            return {
                ...state,
                initOptions: action.payload
            }
        case OPEN_SNACKBAR:
            return {
                ...state,
                snackbars: [...state.snackbars, action.snackbar]
            }
        case CLOSE_SNACKBAR:
            return {
                ...state,
                snackbars: state.snackbars.filter((snackbar: ISnackbar) => snackbar.id !== action.snackbar.id)
            }
        case TRANSLATIONS_SUCCESS:
            return {
                ...state,
                translations: action.payload
            }
        default:
            return state;
    }
}
