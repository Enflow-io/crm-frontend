import Axios from "axios";
import * as Lockr from "lockr";

export default class Api {

    private static apiUrl = 'http://localhost:3010/api';

    static async getHeaders(){
        const userData = Lockr.get('user');
        if(!userData){
            return undefined
        }

        return {
            Authorization: `Bearer ${userData.token}`
        }
    }

    static async login(email: string, password: string){
        const data = await Axios.post(`${this.apiUrl}/auth/login`, {
            email,
            password
        })

        return data;
    }


    static async get(url: string){
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}${url}`, {
                headers: {
                    ...headers
                }
        })

        return data;
    }

}