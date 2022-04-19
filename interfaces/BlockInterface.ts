import {BuildingInterface} from "./BuildingInterface";
import {ImageInterface} from "./ImageIntarface";
import {UserInterface} from "./user.interface";

export interface BlockInterface {
    id: number
    name: string
    localId: string
    isOnMarket: boolean
    isRent: boolean
    blockType: string
    agreementType: string
    cianId: string
    floor: number
    area: number
    bti: string
    bonusPercent: number
    finishing: string,
    planType: string
    rentPrice: number
    taxIncluded: string
    buildingId: number
    building: BuildingInterface
    pics: ImageInterface[]
    isOnAvito:boolean
    updaterId: number
    updatedBy: UserInterface
    creatorId: number
    creator: UserInterface
    updatedAt: string
    createdAt: string
    opex: string
    salePriceAmount: string
    commCosts: string
    opexPrice: string
    fullPriceAmount: string
    monthPriceAmount: string
    rentPriceAmount: string
    realisationType: string
    rentalHolidays: number
}