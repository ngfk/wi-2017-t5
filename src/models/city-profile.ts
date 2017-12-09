export interface CityProfilePayload {
    name: string;
    museums: Museum[];
    monuments: Monument[];
    clubs: Club[];
    miscs: Misc[];
    priceRange: number;
    ratings: number[];
}

export interface Museum {
    name: string;
    price: number;
    rating: number;
}

export interface Monument {
    name: string;
    price: number;
    rating: number;
}

export interface Club {
    name: string;
    prices: number[];
    rating: number;
}

export interface Misc {
    name: string;
    price: number;
    rating: number;
}

export class CityProfile {
    public readonly name: string;
    public readonly museums: Museum[];
    public readonly monuments: Monument[];
    public readonly clubs: Club[];
    public readonly miscs: Misc[];
    public readonly priceRange: number;
    public readonly ratings: number[];

    constructor(payload: CityProfilePayload) {
        this.name = payload.name;
        this.museums = payload.museums;
        this.monuments = payload.monuments;
        this.clubs = payload.clubs;
        this.miscs = payload.miscs;
        this.priceRange = payload.priceRange;
        this.ratings = payload.ratings;
    }
}

export const cities = new Map<string, CityProfile>();
