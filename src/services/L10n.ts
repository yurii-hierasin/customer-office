import {ITranslations} from '../interfaces/app';

export default class L10n {
    protected translations: ITranslations

    constructor(translations: ITranslations) {
        this.translations = translations
    }

    get(key: string): string {
        // @ts-ignore
        return this.translations[key] || ''
    }
}
