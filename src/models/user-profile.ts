export interface UserProfilePayload {
    readonly name: string;
    readonly relevantPictureResponses: PictureData[];
    readonly relevantPostResponses: PostData[];
}

export interface PictureData {
    pictureResponse: any | undefined;
}

export interface PostData {
    postResponse: any[] | undefined;
}

export class UserProfile {
    public readonly name: string;
    public readonly relevantPictureResponses: PictureData[];
    public readonly relevantPostResponses: PostData[];

    constructor(payload: UserProfilePayload) {
        this.name = payload.name;
        this.relevantPictureResponses = payload.relevantPictureResponses;
        this.relevantPostResponses = payload.relevantPostResponses;
    }
}

export const profiles = new Map<string, UserProfile>();
