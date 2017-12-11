import { VisualRecognitionV3 } from 'watson-developer-cloud';
import {
    ClassifierResult,
    ClassifyParams
} from 'watson-developer-cloud/visual-recognition/v3-generated';

import { Config, ConfigType } from '../models/config';

export class VisualRecognition {
    private static API: VisualRecognitionV3;
    private static CUSTOM_CLASSIFIER_ID: string;

    constructor() {
        if (VisualRecognition.API) return;

        const config = Config.get(ConfigType.VisualRecognition);
        VisualRecognition.API = new VisualRecognitionV3({
            api_key: config.api_key,
            version_date: '2016-05-20'
        });
        VisualRecognition.CUSTOM_CLASSIFIER_ID = config.custom_classifier_id;
    }

    public classify(file: Buffer): Promise<ClassifierResult> {
        return this.request({
            images_file: file,
            parameters: {
                classifier_ids: VisualRecognition.CUSTOM_CLASSIFIER_ID
            } as any
        });
    }

    private request(payload: ClassifyParams): Promise<ClassifierResult> {
        return new Promise<ClassifierResult>((resolve, reject) => {
            VisualRecognition.API.classify(payload, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
