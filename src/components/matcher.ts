import { CityProfile } from '../models/city-profile';
import { DataStore } from '../models/data-store';
import { UserInterest } from '../models/interest';
import { UserProfile } from '../models/user-profile';
import { UserToken } from '../models/user-token';
import { reasonMap } from '../utils/interest-reason-map';

export class Matcher {
    private user: UserToken;
    private userProfile: UserProfile;
    private cityProfiles: CityProfile[];

    constructor(user: UserToken) {
        this.user = user;
        const profile = DataStore.getUserProfile(user);
        if (!profile) throw new Error('Unknown user: ' + user.id);

        this.userProfile = profile;
        this.cityProfiles = DataStore.getCityProfiles();
    }

    public match(): CityProfile {
        const conversation = DataStore.getConversation(this.user);

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
        const reasons: string[] = [];
        for (let i = 0; i < this.cityProfiles.length; i++) {
            const city = this.cityProfiles[i];

            scores[i] = 0;
            let highestScore = 0;
            for (let interest of Object.keys(city.scores) as UserInterest[]) {
                const score =
                    this.userProfile.scores[interest] *
                    city.scores[interest] *
                    relevance[interest];

                if (score > highestScore) {
                    highestScore = score;
                    reasons[i] = interest;
                }

                scores[i] += score;
            }
        }

        const cityIndex = scores.indexOf(Math.max(...scores));
        conversation.setContext(
            'reasons_of_match',
            reasonMap[reasons[cityIndex]]
        );
        return this.cityProfiles[cityIndex];
    }
}
