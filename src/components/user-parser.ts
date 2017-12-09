import { UserProfile } from '../models/user-profile';
import {
    NaturalLanguageUnderstanding
} from '../watson/natural-language-understanding';
import { VisualRecognition } from '../watson/visual-recognition';

export class UserParser {
    private static NLU = new NaturalLanguageUnderstanding();
    private static VR = new VisualRecognition();

    private profile: UserProfile;
    private promises: Promise<any>[] = [];

    constructor(name: string) {
        this.profile = new UserProfile({
            name,
            relevantPictureResponses: [],
            relevantPostResponses: []
        });
    }

    public addPost(post: string): this {
        this.promises.push(this.parsePost(post));
        return this;
    }

    public addImage(image: Buffer): this {
        this.promises.push(this.parseImage(image));
        return this;
    }

    public async parse(): Promise<UserProfile> {
        // Wait for all the parsing to be finished
        await Promise.all(this.promises);

        // Profile should be up to date now
        return this.profile;
    }

    private async parsePost(post: string): Promise<void> {
        const result = await UserParser.NLU.analyze(post);
        this.profile.relevantPostResponses.push({
            postResponse: result.keywords
        });
    }

    private async parseImage(image: Buffer): Promise<void> {
        const result = await UserParser.VR.classify(image);
        this.profile.relevantPictureResponses.push({
            pictureResponse: result
        });
        // TODO: modify `this.profile` using new image result
    }
}
