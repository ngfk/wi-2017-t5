export enum City {
    DenHaag = 'den-haag',
    Leiden = 'leiden',
    Utrecht = 'utrecht'
}

export interface CityProfile {
    readonly name: string;
    readonly museums: Museum[];
    readonly monuments: Monument[];
    readonly clubs: Club[];
    readonly misc: Misc[];
    readonly priceRange: number;
    readonly ratings: number[];
}

export interface Museum {
    readonly name: string;
    readonly price: number;
    readonly rating: number;
}

export interface Monument {
    readonly name: string;
    readonly price: number;
    readonly rating: number;
}

export interface Club {
    readonly name: string;
    readonly prices: number[];
    readonly rating: number;
}

export interface Misc {
    readonly name: string;
    readonly price: number;
    readonly rating: number;
}
