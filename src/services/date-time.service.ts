export default class DateTimeService {
    constructor(
        private locale: string,
    ) {
    }

    getLocale(): string {
        return this.locale
    }

    getDate(date: string) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }

        return new Intl.DateTimeFormat(this.locale, options).format(new Date(date))
    }

    getDateTime(date: string) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }

        return new Intl.DateTimeFormat(this.locale, options).format(new Date(date))
    }
}
