import { InterestScores, UserInterest } from './interest';

export class UserProfileBuilder {
    private profile: UserProfile;

    constructor(name: string) {
        this.profile = {
            name,
            scores: {
                architecture: 0,
                canal: 0,
                drugs: 0,
                flowers: 0,
                food: 0,
                museum: 0,
                party: 0,
                redLightDistrict: 0
            }
        };
    }

    // TODO: Extend with functions that update the score given a confidence
    // score from NLU or VR.

    public category<T extends UserInterest>(interest: T, score: number): this {
        this.setScore(interest, this.profile.scores[interest] + score);
        return this;
    }

    public setScore<T extends UserInterest>(interest: T, score: number): this {
        this.profile = {
            ...this.profile,
            scores: { ...this.profile.scores, [interest]: score }
        };

        return this;
    }

    public build(): UserProfile {
        return { ...this.profile };
    }
}

export interface UserProfile {
    readonly name: string;
    readonly scores: InterestScores;
}

export const profiles = new Map<string, UserProfile>();
