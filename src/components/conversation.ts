import { ConversationV1 } from 'watson-developer-cloud';
import {
    Context,
    MessageParams,
    MessageResponse
} from 'watson-developer-cloud/conversation/v1-generated';

import { CityProfile } from '../models/city-profile';
import { Config, ConfigType } from '../models/config';
import { ConversationVariable } from '../models/conversation-context';
import { DataStore } from '../models/data-store';
import { UserInterest } from '../models/interest';
import { UserProfile, UserProfileBuilder } from '../models/user-profile';
import { UserToken } from '../models/user-token';
import { Matcher } from './matcher';

export interface MessageResult {
    text: string[];
    location?: [number, number];
    profile?: UserProfile;
}

export class Conversation {
    private static API: ConversationV1;
    private static WORKSPACE: string;

    private user: UserToken;
    private context: Context;

    constructor(user: UserToken) {
        this.user = user;
        this.context = {} as any;

        if (Conversation.API) return;
        const config = Config.get(ConfigType.Conversation);
        Conversation.API = new ConversationV1({
            username: config.username,
            password: config.password,
            version_date: '2017-05-26'
        });
        Conversation.WORKSPACE = config.workspace;
    }

    public setCityProfile(cityProfile: CityProfile): this {
        const userProfile = DataStore.getUserProfile(this.user);
        if (!userProfile) {
            // prettier-ignore
            const err = 'Should not set city profile if no user profile is created';
            throw new Error(err);
        }

        const enoughPreferences = !Object.keys(userProfile.scores)
            .map(key => userProfile.scores[key])
            .every(score => score === 0);

        this.setContext('enough_preferences', enoughPreferences);
        this.setContext('matching_city', cityProfile.name);
        return this;
    }

    public setContext<T extends ConversationVariable>(
        variable: T,
        value: any
    ): this {
        (this.context as any)[variable] = value;
        return this;
    }

    public async message(text?: string): Promise<MessageResult> {
        const data = await this.request({
            workspace_id: Conversation.WORKSPACE,
            context: { ...this.context },
            input: { text: text! }
        });

        this.context = data.context;
        const adjusted = this.adjustScore();

        let location = undefined;
        if (this.context['location']) {
            const match = DataStore.getCityMatch(this.user);
            location = match && match.location;
            delete this.context['location'];
        }

        return {
            text: data.output.text,
            profile: adjusted && DataStore.getUserProfile(this.user),
            location
        };
    }

    private adjustScore(): boolean {
        const profile = DataStore.getUserProfile(this.user);
        if (!profile) {
            // prettier-ignore
            const err = 'Should not adjust scores if no user profile is created';
            throw new Error(err);
        }

        let rematch = false;
        const builder = UserProfileBuilder.fromProfile(profile);
        const interests = Object.keys(profile.scores) as UserInterest[];

        for (let interest of interests) {
            if (this.context[interest + '_positive']) {
                rematch = true;
                const newProfile = builder.setScore(interest, 1.2).build();
                DataStore.setUserProfile(this.user, newProfile);
                delete this.context[interest + '_positive'];
            } else if (this.context[interest + '_negative']) {
                rematch = true;
                const newProfile = builder.setScore(interest, 0).build();
                DataStore.setUserProfile(this.user, newProfile);
                delete this.context[interest + '_negative'];
            }
        }

        if (rematch) {
            const matcher = new Matcher(this.user);
            const city = matcher.match();
            this.setCityProfile(city);
        }

        return rematch;
    }

    private request(payload: MessageParams): Promise<MessageResponse> {
        return new Promise((resolve, reject) => {
            Conversation.API.message(payload, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
