import {BuildingInterface} from "./BuildingInterface";
import {ImageInterface} from "./ImageIntarface";

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
}