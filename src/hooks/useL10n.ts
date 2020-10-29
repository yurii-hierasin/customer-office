import {useSelector} from 'react-redux';
import {IRootState} from '../interfaces/signUp';
import L10n from '../services/L10n';

/**
 * In future we can add possibility to change the language
 * inside the app using a drop down without app reloading.
 */
export const useL10n = (): L10n => {
    const translations = useSelector((state: IRootState) => state.app.translations)

    return new L10n(translations)
}
