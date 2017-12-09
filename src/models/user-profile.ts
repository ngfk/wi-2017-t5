export interface UserProfile {
    name: string;
    preferences: Preferences[];
}

export interface Preferences {
    relevantPictureResponses: PictureData[];
    relevantPostResponses: PostData[];
}

export interface PictureData {
    pictureResponse: any[];
}

export interface PostData {
    postResponse: any[];
}
