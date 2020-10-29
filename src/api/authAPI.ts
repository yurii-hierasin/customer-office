import axios from 'axios';
import {ISignInData, ISignUpData} from '../interfaces/signUp';
import BaseAPI from './baseAPI';

export default class AuthAPI extends BaseAPI {
    initiate(baseURL: string) {
        this.axios = axios.create({
            baseURL: baseURL,
            responseType: 'json'
        })
    }

    register(payload: ISignUpData) {
        return this.axios.post('/me/register', payload)
    }

    login(payload: ISignInData) {
        return this.axios.post('/me/login', payload)
    }

    resetPass(email: string) {
        return this.axios.post('/me/reset-notify', {email})
    }

    fetchProfile() {
        return this.axios.get('/me/profile')
    }
}

export const authAPI = new AuthAPI()
