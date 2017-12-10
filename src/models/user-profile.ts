export class UserProfileBuilder {
    private profile: UserProfile;

    constructor(name: string) {
        this.profile = {
            name,
            architecture: 0,
            canal: 0,
            drugs: 0,
            flowers: 0,
            food: 0,
            museum: 0,
            party: 0,
            redLightDistrict: 0
        };
    }

    // TODO: Extend with functions that update the score given a confidence
    // score from NLU or VR.

    public category<T extends UserInterest>(interest: T, score: number): this {
        this.setScore(interest, this.profile[interest] + score);
        return this;
    }

    public setScore<T extends UserInterest>(type: T, score: number): this {
        this.update({ [type]: score });
        return this;
    }

    public update(profile: Partial<UserProfileScores>): this {
        this.profile = { ...this.profile, ...profile };
        return this;
    }

    public build(): UserProfile {
        return { ...this.profile };
    }
}

export interface UserProfile extends UserProfileScores {
    readonly name: string;
}

export interface UserProfileScores {
    readonly architecture: number;
    readonly canal: number;
    readonly drugs: number;
    readonly flowers: number;
    readonly food: number;
    readonly museum: number;
    readonly party: number;
    readonly redLightDistrict: number;
}

export type UserInterest = keyof UserProfileScores;

export const profiles = new Map<string, UserProfile>();
