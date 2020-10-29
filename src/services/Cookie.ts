export default class Cookie {
    static set(key: string, value: string, exdays: Date | number) {
        let expires
        if (exdays instanceof Date) {
            expires = '; expires=' + exdays.toUTCString()
        } else if (exdays) {
            const date = new Date()
            date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000)
            expires = '; expires=' + date.toUTCString()
        } else {
            expires = ''
        }

        document.cookie = key + '=' + value + expires + '; path=/'
    }

    static get(key: string) {
        const name = key + '='
        const decodedCookie = decodeURIComponent(document.cookie)
        const ca = decodedCookie.split(';')

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length)
            }
        }

        return ''
    }

    static has(key: string) {
        return this.get(key) !== ''
    }
}
