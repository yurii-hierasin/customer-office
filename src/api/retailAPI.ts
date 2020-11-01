import axios from 'axios';
import BaseAPI from './baseAPI';

export default class RetailAPI extends BaseAPI {
    initiate(baseURL: string, token: string) {
        this.axios = axios.create({
            baseURL: baseURL,
            headers: {
                Token: token,
            },
            responseType: 'json'
        })
    }

    fetchTranslations(locale: string) {
        return this.axios.get(`/translations/${locale}`)
    }

    fetchOrders() {
        return this.axios.get('/orders')
    }
}

export const retailAPI = new RetailAPI()
