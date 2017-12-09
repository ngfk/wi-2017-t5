import { CityProfile } from '../models/city-profile';
import { UserProfile } from '../models/user-profile';

export class Matcher {
    public match(user: UserProfile, cities: CityProfile[]): CityProfile {
        throw new Error('unimplemented method');
    }
}
