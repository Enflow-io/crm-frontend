import Axios from "axios";
import * as Lockr from "lockr";
import {BuildingInterface} from "../interfaces/BuildingInterface";
import {BlockInterface} from "../interfaces/BlockInterface";
import {UserInterface} from "../interfaces/user.interface";

export default class Api {

    public static apiUrl = process.env.NEXT_PUBLIC_API_HOST;

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


    static async removeUser(userId: number){
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/users/${userId}`, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async getBlock(blockId: number){
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/offices/${blockId}`, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async deleteImage(imageId: number){
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/files/${imageId}`, {
            headers: {
                ...headers
            }
        })
        return data;
    }


    static async createBuilding(props: BuildingInterface){
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/objects/`,  props,{
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async updateBuilding(props: BuildingInterface, id: number){
        const headers = await this.getHeaders();
        if(!id){
            throw Error('No id for updated object')
        }
        const data = await Axios.patch(`${this.apiUrl}/objects/${id}`,  props,{
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async createBlock(props: BlockInterface){
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/offices/`,  props,{
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async updateBlock(props: BlockInterface, id: number){
        const headers = await this.getHeaders();
        if(!id){
            throw Error('No id for updated block')
        }
        const data = await Axios.patch(`${this.apiUrl}/offices/${id}`,  props,{
            headers: {
                ...headers
            }
        })
        return data;
    }


 static async createUser(props: UserInterface){
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/users/`,  props,{
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async updateUser(props: UserInterface, id: number){
        const headers = await this.getHeaders();
        if(!id){
            throw Error('No id for updated user')
        }
        const data = await Axios.patch(`${this.apiUrl}/users/${id}`,  props,{
            headers: {
                ...headers
            }
        })
        return data;
    }


    static async convertPrice(from: string, to: string, amount: number){
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/currencies/convert/${from}/${to}/${amount}`, {
            headers: {
                ...headers
            }
        })

        return data;
    }



}