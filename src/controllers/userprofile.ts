import {
    NaturalLanguageUnderstanding
} from '../watson/natural-language-understanding';
import { VisualRecognition } from '../watson/visual-recognition';

export class UserProfile {
    private natural = new NaturalLanguageUnderstanding();
    private visualrecognition = new VisualRecognition();
}
