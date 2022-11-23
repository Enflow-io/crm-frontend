import Axios from "axios";
import * as Lockr from "lockr";
import {BuildingInterface} from "../interfaces/BuildingInterface";
import {BlockInterface} from "../interfaces/BlockInterface";
import {UserInterface} from "../interfaces/user.interface";
import { OrderMapItem } from "../components/Objects/ObjectCard/BldImages";

export default class Api {

    public static apiUrl = process.env.NODE_ENV === 'development' ?  process.env.NEXT_PUBLIC_API_HOST_DEV : process.env.NEXT_PUBLIC_API_HOST_PROD;

    static async getHeaders() {
        const userData = Lockr.get('user');
        if (!userData) {
            return undefined
        }

        return {
            Authorization: `Bearer ${userData.token}`
        }
    }

    static async login(email: string, password: string) {
        const data = await Axios.post(`${this.apiUrl}/auth/login`, {
            email,
            password
        })

        return data;
    }


    static async get(url: string) {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}${url}`, {
            headers: {
                ...headers
            }
        })

        return data;
    }


    static async removeUser(userId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/users/${userId}`, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async getBlock(blockId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/offices/${blockId}`, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async deleteImage(imageId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/files/${imageId}`, {
            headers: {
                ...headers
            }
        })
        return data;
    }


    static async createBuilding(props: BuildingInterface) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/objects/`, props, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async updateBuilding(props: BuildingInterface, id: number) {
        const headers = await this.getHeaders();
        if (!id) {
            throw Error('No id for updated object')
        }
        const data = await Axios.patch(`${this.apiUrl}/objects/${id}`, props, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async createBlock(props: BlockInterface) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/offices/`, props, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async updateBlock(props: BlockInterface, id: number) {
        const headers = await this.getHeaders();
        if (!id) {
            throw Error('No id for updated block')
        }
        const data = await Axios.patch(`${this.apiUrl}/offices/${id}`, props, {
            headers: {
                ...headers
            }
        })
        return data;
    }


    static async createUser(props: UserInterface) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/users/`, props, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async updateUser(props: UserInterface, id: number) {
        const headers = await this.getHeaders();
        if (!id) {
            throw Error('No id for updated user')
        }
        const data = await Axios.patch(`${this.apiUrl}/users/${id}`, props, {
            headers: {
                ...headers
            }
        })
        return data;
    }


    static async convertPrice(from: string, to: string, amount: number) {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/currencies/convert/${from}/${to}/${amount}`, {
            headers: {
                ...headers
            }
        })

        return data;
    }


    static async getCurrentUser() {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/users/me`, {
            headers: {
                ...headers
            }
        })

        return data.data;
    }

    static async updateCurrentUser(user: UserInterface) {
        const headers = await this.getHeaders();
        const data = await Axios.patch(`${this.apiUrl}/users/me`, user, {
            headers: {
                ...headers
            }
        })

        return data.data;
    }

    static async changeUserPassword(oldPassword: string, newPassword: string) {
        const headers = await this.getHeaders();
        const data = await Axios.patch(`${this.apiUrl}/auth/update-password`, {
            password: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                ...headers
            }
        })

        return data.data;
    }


    static async getBlocksLists() {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/user-lists/blocks`, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async getBuildingsLists() {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/user-lists/buildings`, {
            headers: {
                ...headers
            }
        })
        return data;
    }


    static async deleteBuildingList(id: number) {
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/user-lists/buildings`, {
            headers: {
                ...headers
            },
            data: {
                id
            }
        })
        return data;
    }

    static async deleteBlockList(id: number) {
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/user-lists/blocks`, {
            headers: {
                ...headers
            },
            data: {
                id
            }
        })
        return data;
    }


    static async createBlockList(name: string) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/user-lists/blocks`, {
            name
        }, {
            headers: {
                ...headers
            }
        })
        return data;
    }


    static async createBuildingList(name: string) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/user-lists/buildings`, {
            name
        }, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async toggleBuildingInlist(listId: number, buildingId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/user-lists/buildings/${listId}`, {
            id: buildingId
        }, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async toggleBuildingsInlist(listId: number, buildingIds: number[]) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/user-lists/buildings/toggle-multi/${listId}`, {
            ids: buildingIds
        }, {
            headers: {
                ...headers
            }
        })
        return data;
    }
    static async toggleBlocksInlist(listId: number, blocksIds: number[]) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/user-lists/blocks/toggle-multi/${listId}`, {
            ids: blocksIds
        }, {
            headers: {
                ...headers
            }
        })
        return data;
    }

    static async toggleBlockInlist(listId: number, blockId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/user-lists/blocks/${listId}`, {
            id: blockId
        }, {
            headers: {
                ...headers
            }
        })
        return data;
    }


    static async elasticSearch(bldQuery: any, blockQuery: any, currentPage = 1){
        const headers = await this.getHeaders();


        console.log({
            building: bldQuery,
            block: blockQuery
        })

        const data = await Axios.post(`${this.apiUrl}/search`, {
            building: bldQuery,
            block: blockQuery,
            page: currentPage
        }, {
            headers: {
                ...headers
            }
        });

        return data.data;
    }


    static async updateFilesOrder(orderMap: OrderMapItem[]){
        console.log(orderMap)

        const headers = await this.getHeaders();

        const data = await Axios.post(`${this.apiUrl}/files/update-order`, {
            orderMap
        }, {
            headers: {
                ...headers
            }
        });

        return data.data;
    }

    static async deleteBlock(blockId: number){
        

        const headers = await this.getHeaders();

        const data = await Axios.delete(`${this.apiUrl}/blocks/${blockId}`, {
            headers: {
                ...headers
            }
        });

        return data.data;
    }

    static async deleteObject(modelId: number){
        

        const headers = await this.getHeaders();

        const data = await Axios.delete(`${this.apiUrl}/buildings/${modelId}`, {
            headers: {
                ...headers
            }
        });

        return data.data;
    }

}