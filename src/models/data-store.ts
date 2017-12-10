import * as denHaag from '../cities/Den haag.json';
import * as leiden from '../cities/Leiden.json';
import * as utrecht from '../cities/Utrecht.json';
import { Conversation } from '../components/conversation';
import { City, CityProfile } from './city-profile';
import { UserProfile } from './user-profile';
import { UserToken } from './user-token';

export class DataStore {
    private profiles = new Map<string, UserProfile>();
    private conversations = new Map<string, Conversation>();

    private cities = new Map<City, CityProfile>();

    constructor() {
        // Load city profiles
        this.cities.set(City.DenHaag, denHaag);
        this.cities.set(City.Leiden, leiden);
        this.cities.set(City.Utrecht, utrecht);
    }

    public getToken(token: string): UserToken {
        return UserToken.fromToken(token);
    }

    public setUserProfile(token: UserToken, profile: UserProfile): void {
        this.profiles.set(token.id, profile);
    }

    public getUserProfile(token: UserToken): UserProfile | undefined {
        return this.profiles.get(token.id);
    }

    public getConversation(user: UserToken): Conversation {
        const stored = this.conversations.get(user.id);
        if (stored) return stored;

        const conversation = new Conversation();
        this.conversations.set(user.id, conversation);
        return conversation;
    }

    public getCityProfile(city: City): CityProfile | undefined {
        return this.cities.get(city);
    }

    public getCityProfiles(): CityProfile[] {
        return Array.from(this.cities.entries());
    }
}

export const store = new DataStore();
