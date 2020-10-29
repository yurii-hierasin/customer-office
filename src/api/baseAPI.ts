import axios, {AxiosInstance} from 'axios';

export default class BaseAPI {
    protected axios: AxiosInstance;

    constructor() {
        this.axios = axios.create()
    }
}
