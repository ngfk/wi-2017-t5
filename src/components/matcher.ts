import { CityProfile } from '../models/city-profile';
import { store } from '../models/data-store';
import { UserInterest } from '../models/interest';
import { UserProfile } from '../models/user-profile';
import { UserToken } from '../models/user-token';

type Interest = { label: UserInterest; score: number };

export class Matcher {
    private user: UserProfile;
    private cities: CityProfile[];

    constructor(user: UserToken) {
        const profile = store.getUserProfile(user);
        if (!profile) throw new Error('Unknown user: ' + user.id);

        this.user = profile;
        this.cities = store.getCityProfiles();
    }

    public match(): CityProfile | undefined {
        const highestprefs = this.highestScores();
        const enough_preferences = highestprefs[0].score > 0.5;
        let matching_city: CityProfile | undefined;
        if (enough_preferences) {
            for (let city of this.cities) {
                if (this.interestMatch(city, highestprefs[0])) {
                    matching_city = city;
                }
            }
        }
        return matching_city;
    }

    private interestMatch(city: CityProfile, interest: Interest): boolean {
        switch (interest.label) {
            case 'architecture':
                break;
            case 'canal':
                break;
            case 'drugs':
                break;
            case 'flowers':
                break;
            case 'food':
                break;
            case 'museum':
                break;
            case 'party':
                break;
            case 'redLightDistrict':
                break;
        }
        return false;
    }

    private highestScores(): Interest[] {
        const interests: Interest[] = [];
        for (let interest in this.user.scores) {
            interests.push({
                label: interest as UserInterest,
                score: this.user[interest]
            });
        }

        return interests.sort((a, b) => b.score - a.score).slice(0, 3);
    }
}
