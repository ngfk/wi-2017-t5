import * as fs from 'fs';
import * as lineReader from 'readline';

import { UserProfile as UserProfileModel } from '../models/userprofile';
import {
    NaturalLanguageUnderstanding
} from '../watson/natural-language-understanding';
import { VisualRecognition } from '../watson/visual-recognition';

export class UserProfile {
    private model: UserProfileModel;
    private natural = new NaturalLanguageUnderstanding();
    private visualrecognition = new VisualRecognition();

    public parsePosts(filePath: string) {
        const lr = lineReader.createInterface({
            input: fs.createReadStream(filePath + '/Posts.txt')
        });

        lr.on('line', function(line) {
            console.log(line);
        });
    }
}
