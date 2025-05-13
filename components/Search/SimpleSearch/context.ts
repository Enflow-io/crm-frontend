import { useFormContext } from "react-hook-form";
import { SpecialCategoryEnum } from "../../../interfaces/BlockInterface";
export type Filter = {
    realisationType: string;
    name?: string;
    address?: string;
    metro?: string[];
    globalDistrict?: string[];
    district?: string[];
    type?: string[];
    isCoworking?: number;
    taxOffice?: number;
    rentType?: number;
    rentPrice?: number[];
    area?: number[];
    monthPriceAmount?: number[];
    workingPlaces?: number[];
    saleType: string;
    salePrice?: number[];
    fullPriceAmount?: number[];
    polygon?: [number, number][];
    isOnMarket?: boolean;
    specialCategory?: SpecialCategoryEnum;
};

export const useFormFilter = () => useFormContext<Filter>();
