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
    participants?: IPerson[]
    blockToCompanies?: any
}

export enum CompanyCommentTypesEnum {
    REQUEST = 'заявка',
    CALL = 'звонок',
    SELECTION = 'подборка',
    SHOW = 'показ',
    AGREEMENT = 'договор'
}

export interface ICompanyComment {
    id: number
    companyId: number
    type: CompanyCommentTypesEnum
    text: string
    createdAt: Date
    updatedAt: Date
    authorId: number
    author: {
        id: number
        name: string
        lastName: string
    }
}

export interface IPersonComment {
    id: number
    participantId: number
    text: string
    createdAt: Date
    updatedAt: Date
    authorId: number
    author: {
        id: number
        name: string
        lastName: string
    }

}

export interface IPerson {
    id: number
    firstName: string
    thirdName: string
    lastName: string
    companyId: number
    state: boolean
    department: string
    position: string
    createdAt: Date
    updatedAt: Date
    createdBy: number
    updatedBy: number
    createdByUser: UserInterface
    updatedByUser: UserInterface
    contactInfo: IPersonContactInfo
    isHidden: boolean
    note: string
}

export interface ICompanyAttach {
    blockId: number | null
    buildingId: number
    companyId: number
    type: string
    details: any
}

export interface IContragent extends ICompanyAttach {
    id: number
}