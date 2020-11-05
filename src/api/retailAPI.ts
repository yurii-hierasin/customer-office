import axios from 'axios';
import BaseAPI from './baseAPI';
import {IOrder, IServiceListItem} from '../store/retail/interfaces';

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

    fetchVisaGroups() {
        return this.axios.get('/visa-groups')
    }

    fetchDestinations () {
        return this.axios.get('/destinations')
    }

    fetchCitizenships () {
        return this.axios.get('/citizenships')
    }

    fetchOrderDocs(order: IOrder) {
        return this.axios.get(`/orders/${order.id}/files`)
    }

    fetchOrderServiceItemDocs(orderServiceItem: IServiceListItem) {
        return this.axios.get(`/orders/${orderServiceItem.order_id}/services/${orderServiceItem.id}/files`)
    }

}

export const retailAPI = new RetailAPI()
