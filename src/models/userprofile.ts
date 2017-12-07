export interface UserProfile {
    Name: string;
    Preferences: Preferences[];
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
