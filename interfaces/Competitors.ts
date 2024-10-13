export interface ICreateCompetitor {
    name: string
    cianId: number
}

export interface ICompetitor extends ICreateCompetitor {
    id: number
}

export interface IOffer {
    id: number;
    cianId: number;
    type: string;
    square: number;
    buildingClass: string;
    metro: string;
    address: string;
    buildingName: string;
    floor: string;
    ceiling: number;
    price: number;
    pricePerSquare: number;
    tax: string;
    rentPlan: string;
    phone: string;
    desc?: string;
    parking: string;
    plan: string;
    access: string;
    lift: string;
    gates: string;
    link: string;
    priceFromOffer: string;
    column: string;
    competitorId: number;
    createdAt: Date;
    updatedAt: Date;
}