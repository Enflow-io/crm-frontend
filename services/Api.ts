import Axios, {AxiosError} from "axios";
import * as Lockr from "lockr";
import { BuildingInterface } from "../interfaces/BuildingInterface";
import { BlockInterface } from "../interfaces/BlockInterface";
import { UserInterface } from "../interfaces/user.interface";
import { OrderMapItem } from "../components/Objects/ObjectCard/BldImages";
import { notification } from "antd";
import {ICompany, ICompanyAttach, ICompanyComment, IPerson, IPersonComment} from "../interfaces/CompanyInterface";
import {File} from "@babel/types";
import {IFileInterface} from "../interfaces/FileInterface";
import {ICrateEvent, IEvent, IUpdateEvent} from "../interfaces/EventsInterface";
import {ICompetitor, ICreateCompetitor, IOffer} from "../interfaces/Competitors";
import { User } from "./types";
export default class Api {
    public static apiUrl =
        process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_API_HOST_DEV
            : process.env.NEXT_PUBLIC_API_HOST_PROD;

    static async getHeaders() {
        const userData = Lockr.get("user");
        if (!userData) {
            return undefined;
        }

        return {
            Authorization: `Bearer ${userData.token}`,
        };
    }

    static async login(email: string, password: string) {
        const data = await Axios.post(`${this.apiUrl}/auth/login`, {
            email,
            password,
        });

        return data;
    }

    static async get(url: string) {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}${url}`, {
            headers: {
                ...headers,
            },
        });

        return data;
    }

    static async removeUser(userId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/users/${userId}`, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async getBlock(blockId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/offices/${blockId}`, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async deleteImage(imageId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/files/${imageId}`, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async createBuilding(props: BuildingInterface) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/objects/`, props, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async updateBuilding(props: BuildingInterface, id: number) {
        const headers = await this.getHeaders();
        if (!id) {
            throw Error("No id for updated object");
        }
        const data = await Axios.patch(`${this.apiUrl}/objects/${id}`, props, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async createBlock(props: BlockInterface) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/offices/`, props, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async genereateDescr(block: BlockInterface) {
        const headers = await this.getHeaders();
        const data = await Axios.post(
            `${this.apiUrl}/blocks/${block.id}/generate-description`,
            {},
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data;
    }

    static async updateBlock(props: BlockInterface, id: number) {
        const headers = await this.getHeaders();
        if (!id) {
            throw Error("No id for updated block");
        }
        const data = await Axios.patch(`${this.apiUrl}/offices/${id}`, props, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async createUser(props: UserInterface) {
        const headers = await this.getHeaders();
        const data = await Axios.post(`${this.apiUrl}/users/`, props, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async updateUser(props: UserInterface, id: number) {
        const headers = await this.getHeaders();
        if (!id) {
            throw Error("No id for updated user");
        }
        const data = await Axios.patch(`${this.apiUrl}/users/${id}`, props, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async convertPrice(from: string, to: string, amount: number) {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/currencies/convert/${from}/${to}/${amount}`, {
            headers: {
                ...headers,
            },
        });

        return data;
    }

    static async getCurrentUser() {
        const headers = await this.getHeaders();
        const data = await Axios.get<User>(`${this.apiUrl}/users/me`, {
            headers: {
                ...headers,
            },
        });

        return data.data;
    }

    static async updateCurrentUser(user: UserInterface) {
        const headers = await this.getHeaders();
        const data = await Axios.patch(`${this.apiUrl}/users/me`, user, {
            headers: {
                ...headers,
            },
        });

        return data.data;
    }

    static async changeUserPassword(oldPassword: string, newPassword: string) {
        const headers = await this.getHeaders();
        const data = await Axios.patch(
            `${this.apiUrl}/auth/update-password`,
            {
                password: oldPassword,
                newPassword: newPassword,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );

        return data.data;
    }

    static async getBlocksLists() {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/user-lists/blocks`, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async getBuildingsLists() {
        const headers = await this.getHeaders();
        const data = await Axios.get(`${this.apiUrl}/user-lists/buildings`, {
            headers: {
                ...headers,
            },
        });
        return data;
    }

    static async deleteBuildingList(id: number) {
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/user-lists/buildings`, {
            headers: {
                ...headers,
            },
            data: {
                id,
            },
        });
        return data;
    }

    static async deleteBlockList(id: number) {
        const headers = await this.getHeaders();
        const data = await Axios.delete(`${this.apiUrl}/user-lists/blocks`, {
            headers: {
                ...headers,
            },
            data: {
                id,
            },
        });
        return data;
    }

    static async deleteUser(id: number) {
        try {
            const headers = await this.getHeaders();
            const data = await Axios.delete(`${this.apiUrl}/users/${id}`, {
                headers: {
                    ...headers,
                },
            });

            notification.info({
                message: `Пользователь удален`,
                placement: 'bottomRight'
            });

            return data;
        } catch (error: any) {

            notification.error({
                message: `Не удалось удалить пользователя: ${error?.response?.data?.message}`,
                placement: 'bottomRight'
            });
        }
    }

    static async createBlockList(name: string) {
        const headers = await this.getHeaders();
        const data = await Axios.post(
            `${this.apiUrl}/user-lists/blocks`,
            {
                name,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data;
    }

    static async createBuildingList(name: string) {
        const headers = await this.getHeaders();
        const data = await Axios.post(
            `${this.apiUrl}/user-lists/buildings`,
            {
                name,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data;
    }

    static async toggleBuildingInlist(listId: number, buildingId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.post(
            `${this.apiUrl}/user-lists/buildings/${listId}`,
            {
                id: buildingId,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );

        return data;
    }

    static async reorderBuildingsInList(ids: number[], listId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.post(
            `${this.apiUrl}/user-lists/buildings/reorder/${listId}`,
            {
                ids,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data;
    }

    static async toggleBuildingsInlist(listId: number, buildingIds: number[]) {
        const headers = await this.getHeaders();
        const data = await Axios.post(
            `${this.apiUrl}/user-lists/buildings/toggle-multi/${listId}`,
            {
                ids: buildingIds,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data;
    }
    static async toggleBlocksInlist(listId: number, blocksIds: number[]) {
        const headers = await this.getHeaders();
        const data = await Axios.post(
            `${this.apiUrl}/user-lists/blocks/toggle-multi/${listId}`,
            {
                ids: blocksIds,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data;
    }

    static async toggleBlockInlist(listId: number, blockId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.post(
            `${this.apiUrl}/user-lists/blocks/${listId}`,
            {
                id: blockId,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data;
    }

    static async elasticSearch(bldQuery: any, blockQuery: any, currentPage = 1) {
        const headers = await this.getHeaders();

        console.log({
            building: bldQuery,
            block: blockQuery,
        });

        const data = await Axios.post(
            `${this.apiUrl}/search`,
            {
                building: bldQuery,
                block: blockQuery,
                page: currentPage,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );

        return data.data;
    }

    static async updateFilesOrder(orderMap: OrderMapItem[]) {
        console.log(orderMap);

        const headers = await this.getHeaders();

        const data = await Axios.post(
            `${this.apiUrl}/files/update-order`,
            {
                orderMap,
            },
            {
                headers: {
                    ...headers,
                },
            }
        );

        return data.data;
    }

    static async deleteBlock(blockId: number) {
        const headers = await this.getHeaders();

        const data = await Axios.delete(`${this.apiUrl}/blocks/${blockId}`, {
            headers: {
                ...headers,
            },
        });

        return data.data;
    }

    static async deleteObject(modelId: number) {
        const headers = await this.getHeaders();

        const data = await Axios.delete(`${this.apiUrl}/buildings/${modelId}`, {
            headers: {
                ...headers,
            },
        });

        return data.data;
    }

    static async changeFormRequestStatus(id: number, status: boolean) {
        const headers = await this.getHeaders();
        const data = await Axios.patch(
            `${this.apiUrl}/form-request/${id}`,
            {
                isRead: status
            },
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data;
    }

    static async updateFormRequest(id: number, data: any) {
        const headers = await this.getHeaders();
        const res = await Axios.patch(
            `${this.apiUrl}/form-request/${id}`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res;
    }

    static async getCountUnreadFormRequests(): Promise<number> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/form-request/unread-count`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return Number(data.data || 0);
    }

    static async updateAvatar(avatar: any, userId: number) {
        const headers = await this.getHeaders();
        const file = this.dataURItoBlob(avatar);
        const fmData = new FormData();
        fmData.append('file', file);
        const data = await Axios.post(
            `${this.apiUrl}/users/avatar/${userId}`,
            fmData,
            {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data;'
                },
            }
        );
        return data;
    }
    static dataURItoBlob(dataURI: string) {
        const byteString = atob(dataURI.split(',')[1]);
        //const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        const mimeString = 'image/png';
        const ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        const ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        const blob = new Blob([ab], {type: mimeString});
        return blob;

    }

    static async getCianMultiblocks(buildingId: number) {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/blocks/cian-main-blocks/${buildingId}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async getCianLastReportInfo() {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/cian/getLastOrderInfo`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async getCianOrder() {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/cian/getOrder`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async rotateImage(fileId: number, degrees: number) {
        const headers = await this.getHeaders();
        const data = await Axios.post(
            `${this.apiUrl}/files/rotate`,
            {
                fileId,
                degrees
            },
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async getCompaniesList(short = false): Promise<ICompany[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/companies`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        if (short) {
            return data.data.map((item: any) => ({id: item.id, name: item.name}))
        }
        return data.data;
    }

    static async getCompanyById(id: number): Promise<ICompany> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/companies/${id}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async getUsersList(take = 10): Promise<UserInterface[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/users?take=${take}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data?.data ?? [];
    }

    static async updateCompany(id: number, data: any) {
        const headers = await this.getHeaders();
        const res = await Axios.patch(
            `${this.apiUrl}/companies/${id}`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res;
    }

    static async createCompany(data: any) {
        try {
            const headers = await this.getHeaders();
            const res = await Axios.post(
                `${this.apiUrl}/companies`,
                data,
                {
                    headers: {
                        ...headers,
                    },
                }
            ).catch((e: AxiosError) => {
                throw new Error(e.response?.data?.message ?? 'Произошла ошибка при создании организации');
            })
            return res;
        } catch (e: AxiosError | any) {
            return e
        }
    }

    static async getCompanyChildren(id: number): Promise<ICompany[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/companies/${id}/children`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async getCompanyRefs(id: number) {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/companies/${id}/refs`,
            {
                headers: {
                    ...headers,
                },
            }
        )
        return data.data
    }

    static async getFilesList(entityId: number, entityType: string): Promise<IFileInterface[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/files/list/${entityType}/${entityId}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async getCompanyComments(id: number): Promise<ICompanyComment[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/companiesComments/${id}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async createCompanyComment(data: {
        companyId: number
        text: string
        type: string}) {
        const headers = await this.getHeaders();
        const res = await Axios.post(
            `${this.apiUrl}/companiesComments`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res.data;
    }

    static async createPerson(data: any): Promise<IPerson> {
        const headers = await this.getHeaders();
        const res = await Axios.post(
            `${this.apiUrl}/participant`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res.data;
    }

    static async updatePerson(data: Partial<IPerson>): Promise<IPerson> {
        const headers = await this.getHeaders();
        const res = await Axios.patch(
            `${this.apiUrl}/participant`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res.data;
    }

    static async deletePerson(id: number) {
        const headers = await this.getHeaders();
        await Axios.delete(
            `${this.apiUrl}/participant/${id}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
    }
    static async getPerson(id: number): Promise<IPerson> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/participant/${id}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async getPersonComments(id: number): Promise<IPersonComment[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/participantComments/${id}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async createPersonComment(data: { participantId: number, text: string}): Promise<IPersonComment> {
        const headers = await this.getHeaders();
        const res = await Axios.post(
            `${this.apiUrl}/participantComments`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res.data;
    }

    static async attachCompany(data: ICompanyAttach) {
        const headers = await this.getHeaders();
        const res = await Axios.post(
            `${this.apiUrl}/companies/attach`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res;
    }
    static async patchAttachedCompany(data: ICompanyAttach) {
        const headers = await this.getHeaders();
        const res = await Axios.patch(
            `${this.apiUrl}/companies/attach`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res;
    }

    static async deatachCompany(id: number) {
        const headers = await this.getHeaders();
        const res = await Axios.delete(
            `${this.apiUrl}/companies/attach`,
            {
                data: {
                    id
                },
                headers: {
                    ...headers,
                },
            }
        );
        return res;
    }

    static async getCompaniesByBlock(id: number): Promise<ICompany[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/blocks/${id}/companies`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async getCompaniesByBuilding(id: number): Promise<ICompany[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/buildings/${id}/companies`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async createEvent(data: ICrateEvent): Promise<IEvent> {
        const headers = await this.getHeaders();
        const res = await Axios.post(
            `${this.apiUrl}/events`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res.data;
    }

    static async updateEvent(data: IUpdateEvent) {
        const headers = await this.getHeaders();
        const res = await Axios.patch(
            `${this.apiUrl}/events/${data.id}`,
            data,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res.data;
    }

    static async deleteEvent(id: number) {
        const headers = await this.getHeaders();
        await Axios.delete(
            `${this.apiUrl}/events/${id}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
    }

    static async getEvents(): Promise<IEvent[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/events`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async removeCompany(id: number) {
        const headers = await this.getHeaders();
        const res = await Axios.delete(
            `${this.apiUrl}/companies/${id}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return res;
    }

    static async getTodayEventsCount() {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/events/today`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data.length || 0;
    }

    static async getCompetitors(): Promise<ICompetitor[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/cian-parser/competitor/list`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async getCompetitorOffers(competitorId: number, isSale = false): Promise<IOffer[]> {
        const headers = await this.getHeaders();
        const data = await Axios.get(
            `${this.apiUrl}/cian-parser/competitor/offers?competitorId=${competitorId}&isSale=${isSale}`,
            {
                headers: {
                    ...headers,
                },
            }
        );
        return data.data;
    }

    static async createCompetitor(competitor: ICreateCompetitor): Promise<ICompetitor> {
        try {
            const headers = await this.getHeaders();
            const data = await Axios.post(
                `${this.apiUrl}/cian-parser/competitor`,
                competitor,
                {
                    headers: {
                        ...headers,
                    },
                }
            );
            return data.data;
        } catch (e: AxiosError | any) {
            return e?.message || 'Произошла ошибка при создании конкурента';
        }
    }

    static async getBuildingInfoByCoords(lon: string, lat: string) {
        const data = await Axios.post(
            'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
            {
                lat,
                lon
            },
            {
                headers: {
                    'Authorization': 'Token 1b075067511e98940b1c04863d93018cdcb1624d'
                }
            }
        ).catch((e: AxiosError) => {
            throw new Error(e.response?.data?.message ?? 'Произошла ошибка при вызове апи ДаДата');
        });
        return data.data.suggestions[0] || {}
    }
}
