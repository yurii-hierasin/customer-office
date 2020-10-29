const Storage = {
    set(key: string, value: any) {
        if (value === null || typeof value === 'undefined') {
            return;
        }

        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }

        localStorage.setItem(key, value)
    },

    get(key: string) {
        const value = localStorage.getItem(key)
        try {
            return JSON.parse(value as string)
        } catch (e) {
            return value
        }
    },

    has(key: string) {
        const value = localStorage.getItem(key);
        console.log('storage has', key, value)
        return !!value
    }
}

export default Storage
