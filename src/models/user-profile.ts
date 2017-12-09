export class UserProfileBuilder {
    private profile: UserProfile;

    constructor(name: string) {
        this.profile = {
            name,
            museum: 0,
            canal: 0,
            party: 0,
            flowers: 0,
            drugs: 0,
            architecture: 0,
            redLightDistrict: 0
        };
    }

    // TODO: Extend with functions that update the score given a confidence
    // score from NLU or VR.

    public setScore<T extends keyof UserProfileScores>(
        type: T,
        score: number
    ): this {
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
    readonly museum: number;
    readonly canal: number;
    readonly party: number;
    readonly flowers: number;
    readonly drugs: number;
    readonly architecture: number;
    readonly redLightDistrict: number;
}

export const profiles = new Map<string, UserProfile>();
