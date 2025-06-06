import { Renter } from "../components/FormComponents/RenterList/RenterList";
import { BuildingInterface } from "./BuildingInterface";
import { ImageInterface } from "./ImageIntarface";
import { UserInterface } from "./user.interface";
import { AdditionalParking } from "../components/FormComponents/AdditionalParkingList/AdditionalParkingList";
import { ICompany } from "./CompanyInterface";

export interface BlockInterface {
  id: number;
  name: string;
  localId: string;
  isOnMarket: string;
  isRent: boolean;
  blockType: string;
  agreementType: string;
  cianId: string;
  floor: number;
  area: number;
  bti: string;
  bonusPercent: number;
  finishing: string;
  planType: string;
  rentPrice: number;
  salePrice: number;
  taxIncluded: string;
  buildingId: number;
  building: BuildingInterface;
  pics: ImageInterface[];
  isOnAvito: boolean;
  updaterId: number;
  updatedBy: UserInterface;
  creatorId: number;
  creator: UserInterface;
  cianEnabledBy: UserInterface;
  updatedAt: string;
  createdAt: string;
  opex: string;
  salePriceAmount: string;
  commCosts: string;
  opexPrice: string;
  fullPriceAmount: string;
  monthPriceAmount: string;
  rentPriceAmount: string;
  realisationType: string;
  rentalHolidays: number;
  comeToMarketDate: string;
  daysExposition: number;
  ceilings: string;
  hasCafee: boolean;
  hasWetPoints: boolean;
  hasFalseFloor: boolean;
  ndsSale: string;
  ndsRent: string;
  picsQnt: number;
  cianDescription?: string | null;
  yandexDescription?: string | null;
  renters?: Renter[];
  cianBetStart?: Date;
  cianBetEnd?: Date;
  isOnCian: boolean;
  isOnYandex: boolean;
  additionalParking?: AdditionalParking[];
  parkingIncluded?: boolean;
  cianMainMultiBlockId?: number | null;
  owner?: ICompany | null;
  forbiddenAds?: boolean;
  cianLink?: string;
  updatedByUserDate: Date;
  actualizationDate: Date;
  specialCategory?: SpecialCategoryEnum;
  isGab?: boolean;
}

export enum SpecialCategoryEnum {
  ROTATION = 'rotation', // Расселение/ротация
  MEDICAL = 'medical', // Под мед. центры
  REDEV = 'redev', // Редевелопмент/реконструкция
  PRIMARY = 'primary' // Первичная продажа
}