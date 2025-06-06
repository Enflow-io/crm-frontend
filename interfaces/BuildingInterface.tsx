import {ImageInterface} from "./ImageIntarface";
import {UserInterface} from "./user.interface";

export interface BuildingInterface {
    docs: any[];
    address: string
    addressEng: string
    area: number
    freeRentArea: string
    freeSaleArea: string
    blocks: any[]
    bts: null
    buildingClass: string
    buildingType: string
    buildingYear: string
    cache: any
    constructionStartDate: string
    constructionStatus: string
    coworkingName: string
    district: string
    exclusiveConsultant: string
    feePercentRent: string
    feePercentSale: string
    finishing: string
    fireSystem: string
    fromStation1: string
    fromStation2: string
    globalDistrict: string
    hasAgencyContract: string
    id: number
    infra: string
    isCoworking: boolean
    isExclusive: boolean
    isNewConstruction: boolean
    isOnMarket: string
    latitude: string
    localId: string
    location: any
    longitude: string
    mfrBuildingClass: string
    name: string
    nameEng: string
    notes: string
    officesArea: number
    parkingType: string
    peopleLiftsQnt: number
    pics: ImageInterface[]
    pricesCache: any
    priority: number
    reconstructionYear: number
    floorsHeight: string
    stepKolonn: string
    parkingLoad: string
    parkingNazemQnt: string
    showOnSite: boolean
    hasBigLift: boolean
    parkCoefAuto: string
    parkCoefManual: string
    bigLiftsBrand: string
    station1: string
    station2: string
    subMarket: string
    taxOffice: string
    updateDate: string
    ventType: string
    zone: string
    updaterId: number
    updatedBy: UserInterface
    creatorId: number
    creator: UserInterface
    updatedAt: string
    createdAt: string
    updatedByUserDate: Date
    responsibleForContactsId?: number | null
    responsibleForContacts?: UserInterface | null
}