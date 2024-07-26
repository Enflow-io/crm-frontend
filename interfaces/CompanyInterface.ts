export interface ICompanyContactInfo {
    phone?: string[],
    email?: string[],
    site?: string[],
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
    createdByUser: {
        id: number,
        name: string,
        lastName: string,
        email: string
    },
    updatedByUser: {
        id: number,
        name: string
        lastName: string,
        email: string
    }
    address?: string
}