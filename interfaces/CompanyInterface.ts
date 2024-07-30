import {UserInterface} from "./user.interface";

export interface ICompanyContactInfo {
    phone?: string[],
    email?: string[],
    site?: string[],
}

export interface IPersonContactInfo {
    mobilePhone: string,
    workPhone: string,
    email: string
    additionalPhone: string
    additionalEmail: string
}
export interface ICompany {
    id: number,
    companyId: string,
    name: string,
    nameEng?: string,
    parentId: number,
    contactInfo: ICompanyContactInfo,
    createdAt: Date,
    updatedAt: Date,
    type: string,
    isClient: boolean,
    responsibleId: number,
    responsible: {
        id: number,
        name: string,
        lastName: string
    },
    parent: ICompany,
    children: ICompany[],
    createdBy: number,
    updatedBy: number,
    createdByUser: UserInterface
    updatedByUser: UserInterface
    address?: string
}

export enum CompanyCommentTypesEnum {
    REQUEST = 'заявка',
    CALL = 'звонок',
    SELECTION = 'подборка',
    SHOW = 'показ',
    AGREEMENT = 'договор'
}

export interface IPerson {
    id: number
    name: string
    surname: string
    lastName: string
    companyId: number
    isActive: boolean
    department: string
    position: string
    createdAt: Date
    updatedAt: Date
    createdBy: number
    updatedBy: number
    createdByUser: UserInterface
    updatedByUser: UserInterface
    contacts: IPersonContactInfo
}