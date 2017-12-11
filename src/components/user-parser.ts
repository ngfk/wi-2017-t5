import { Config } from '../models/config';
import { UserProfile, UserProfileBuilder } from '../models/user-profile';
import { categoryMap } from '../utils/nlu-category-map';
import { NaturalLanguageUnderstanding } from './natural-language-understanding';
import { VisualRecognition } from './visual-recognition';

export class UserParser {
    private static NLU = new NaturalLanguageUnderstanding();
    private static VR = new VisualRecognition();

    private profile: UserProfileBuilder;
    private promises: Promise<any>[] = [];

    constructor(name: string) {
        this.profile = new UserProfileBuilder(name);
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
        return this.profile.build();
    }

    private async parsePost(post: string): Promise<void> {
        const result = await UserParser.NLU.analyze(post);

        // Sanity check
        if (!result.categories)
            throw new Error('[NLU] The categories feature should be enabled.');

        // Set category score threshold
        for (let category of result.categories) {
            // Check category score
            if (!category.score || !category.label) continue;

            // Map category to interest
            const interests = categoryMap[category.label];
            if (!interests) continue;

            // Update profile score
            for (let interest of interests) {
                this.profile.category(interest, category.score);

                if (Config.log('post-parsing')) {
                    console.log(
                        '%s\n[%s] %s %s\n',
                        post,
                        category.score,
                        interest,
                        category.label
                    );
                }
            }
        }
    }

    private async parseImage(image: Buffer): Promise<void> {
        const result = await UserParser.VR.classify(image);
        if (!result.images[0].classifiers[0].classes)
            throw new Error('[VR] The classes feature should be enabled.');

        for (let resultClass of result.images[0].classifiers[0].classes) {
            if (!resultClass.score) continue;

            const interests = categoryMap[resultClass.class_name];
            if (!interests) continue;

            for (let interest of interests) {
                this.profile.category(interest, resultClass.score);
            }
        }
    }
}
