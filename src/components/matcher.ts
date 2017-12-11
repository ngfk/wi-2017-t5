import { CityProfile } from '../models/city-profile';
import { store } from '../models/data-store';
import { UserInterest } from '../models/interest';
import { UserProfile } from '../models/user-profile';
import { UserToken } from '../models/user-token';

export class Matcher {
    private user: UserProfile;
    private cities: CityProfile[];

    constructor(user: UserToken) {
        const profile = store.getUserProfile(user);
        if (!profile) throw new Error('Unknown user: ' + user.id);

        this.user = profile;
        this.cities = store.getCityProfiles();
    }

    public match(): CityProfile {
        // Relevance modifier per interest
        const relevance: { [interest in UserInterest]: number } = {
            architecture: 1,
            canal: 1,
            drugs: 0.2,
            flowers: 1,
            food: 0.2,
            museum: 1,
            party: 1,
            redLightDistrict: 0.2
        };

        const scores: number[] = [];
        for (let i = 0; i < this.cities.length; i++) {
            const city = this.cities[i];

            scores[i] = 0;
            for (let interest of Object.keys(city.scores) as UserInterest[]) {
                scores[i] +=
                    this.user.scores[interest] *
                    city.scores[interest] *
                    relevance[interest];
            }
        }

        const cityIndex = scores.indexOf(Math.max(...scores));
        return this.cities[cityIndex];
    }

    private preferenceCount(): number {
        const interests: number[] = [];
        let zeros = 0;
        for (let interest in this.user.scores) {
            interests.push(this.user[interest]);
        }
        for (let numbers of interests) {
            if (numbers === 0) {
                zeros += 1;
            }
        }
        return zeros;
    }
}
