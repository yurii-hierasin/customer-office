import axios from 'axios';
import BaseAPI from './baseAPI';
import {IDocument, IOrder, IServiceListItem} from '../store/retail/interfaces';

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

    public updateOrderDocument(orderId: string, document: IDocument) {
        return this.axios.put(`orders/${orderId}/files/${document.id}`, document);
    }

    public updateOrderItemDocument(orderId: string, orderItemId: number, document: IDocument) {
        return this.axios.put(`orders/${orderId}/services/${orderItemId}/files/${document.id}`, document);
    }

    public sendOrderDocument(orderId: string, document: IDocument) {
        return this.axios.get(`orders/${orderId}/emails/${document.id}`);
    }

    public sendOrderItemDocument(orderId: string, orderItemId: number, document: IDocument) {
        return this.axios.get(`orders/${orderId}/services/${orderItemId}/emails/${document.id}`);
    }

    public add(orderId: number, orderItemId: number, document: any, config = {}) {
        return this.axios.post(`orders/${orderId}/services/${orderItemId}/files`, document, config);
    }

    public deleteOrderItemDocument(orderId: number, orderItemId: number, document: IDocument) {
        return this.axios.delete(`orders/${orderId}/services/${orderItemId}/files/${document.id}`);
    }

    public deleteOrderDocument(orderId: string, document: IDocument) {
        return this.axios.delete(`orders/${orderId}/files/${document.id}`);
    }

    public deleteShippingLabel(orderId: string, shippingId: number) {
        return this.axios.delete(`orders/${orderId}/shipments/${shippingId}/label`);
    }

    public sendShippingLabel(orderId: string, shippingId: number) {
        return this.axios.get(`orders/${orderId}/shipments/${shippingId}/label/email`);
    }

}

export const retailAPI = new RetailAPI()
