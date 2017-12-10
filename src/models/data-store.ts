import * as denHaag from '../Cities/Den haag.json';
import * as leiden from '../Cities/Leiden.json';
import * as utrecht from '../Cities/Utrecht.json';
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
        this.profiles[token.id] = profile;
    }

    public getUserProfile(token: UserToken): UserProfile | undefined {
        return this.profiles[token.id];
    }

    public getConversation(user: UserToken): Conversation {
        const stored = this.conversations.get(user.id);
        if (stored) return stored;

        const conversation = new Conversation();
        this.conversations.set(user.id, conversation);
        return conversation;
    }

    public setCityProfile(city: City, profile: CityProfile): void {
        this.cities[city] = profile;
    }

    public getCityProfile(city: City): CityProfile | undefined {
        return this.cities[city];
    }
}

export const store = new DataStore();
