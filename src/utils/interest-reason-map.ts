import { UserInterest } from '../models/interest';

export const reasonMap: { [interest in UserInterest]: string } = {
    architecture: 'architecture and original buildings',
    canal: 'canals',
    drugs: 'coffee shops',
    flowers: 'gardens and parks',
    food: "restaurants and café's",
    museum: 'museums',
    party: 'clubs',
    redLightDistrict: 'red light district'
};
