import * as denHaag from '../cities/Den haag.json';
import * as leiden from '../cities/Leiden.json';
import * as utrecht from '../cities/Utrecht.json';

export enum City {
    DenHaag = 'den-haag',
    Leiden = 'leiden',
    Utrecht = 'utrecht'
}

export interface CityProfilePayload {
    name: string;
    museums: Museum[];
    monuments: Monument[];
    clubs: Club[];
    misc: Misc[];
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
    public readonly misc: Misc[];
    public readonly priceRange: number;
    public readonly ratings: number[];

    constructor(payload: CityProfilePayload) {
        this.name = payload.name;
        this.museums = payload.museums;
        this.monuments = payload.monuments;
        this.clubs = payload.clubs;
        this.misc = payload.misc;
        this.priceRange = payload.priceRange;
        this.ratings = payload.ratings;
    }
}

export const cities = new Map<City, CityProfile>();
cities.set(City.DenHaag, denHaag);
cities.set(City.Leiden, leiden);
cities.set(City.Utrecht, utrecht);
