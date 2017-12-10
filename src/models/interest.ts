export type UserInterest =
    | 'architecture'
    | 'canal'
    | 'drugs'
    | 'flowers'
    | 'food'
    | 'museum'
    | 'party'
    | 'redLightDistrict';

export type InterestScores = { [interest in UserInterest]: number };
