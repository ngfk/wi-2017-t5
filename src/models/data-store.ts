import * as denHaag from '../cities/Den haag.json';
import * as leiden from '../cities/Leiden.json';
import * as utrecht from '../cities/Utrecht.json';
import { Conversation } from '../components/conversation';
import { City, CityProfile } from './city-profile';
import { UserProfile } from './user-profile';
import { UserToken } from './user-token';

export class DataStore {
    private static profiles = new Map<string, UserProfile>();
    private static conversations = new Map<string, Conversation>();

    private static cities = new Map<City, CityProfile>()
        .set(City.DenHaag, denHaag)
        .set(City.Leiden, leiden)
        .set(City.Utrecht, utrecht);

    private static match = new Map<string, CityProfile>();

    public static setUserProfile(token: UserToken, profile: UserProfile): void {
        this.profiles.set(token.id, profile);
    }

    public static getUserProfile(token: UserToken): UserProfile | undefined {
        return this.profiles.get(token.id);
    }

    public static getConversation(user: UserToken): Conversation {
        const stored = this.conversations.get(user.id);
        if (stored) return stored;

        const conversation = new Conversation(user);
        this.conversations.set(user.id, conversation);
        return conversation;
    }

    public static getCityProfile(city: City): CityProfile | undefined {
        return this.cities.get(city);
    }

    public static getCityProfiles(): CityProfile[] {
        return Array.from(this.cities.entries()).map(([_, value]) => value);
    }

    public static setCityMatch(token: UserToken, city: CityProfile): void {
        this.match.set(token.id, city);
    }

    public static getCityMatch(token: UserToken): CityProfile | undefined {
        return this.match.get(token.id);
    }
}
