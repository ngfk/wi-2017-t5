import { cities, CityProfile } from '../models/city-profile';
import { profiles, UserProfile } from '../models/user-profile';
import { UserToken } from '../models/user-token';

export class Matcher {
    private user: UserProfile;
    private cities: CityProfile[];

    constructor(user: UserToken) {
        const profile = profiles.get(user.id);
        if (!profile) throw new Error('Unknown user: ' + user.id);

        this.user = profile;
        this.cities = Array.from(cities.entries());
    }

    public match(): CityProfile {
        throw new Error('unimplemented method');
    }
}
