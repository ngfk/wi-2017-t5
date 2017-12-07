export interface CityProfile {
    name: string;
    musea: Museum[];
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
