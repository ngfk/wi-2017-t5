import { VisualRecognitionV3 } from 'watson-developer-cloud';

import { Config, ConfigType } from '../models/config';

interface ClassifyParams {
    images_file: Buffer;
}

export interface ClassifyResult {
    // TODO...
}

export class VisualRecognition {
    private static API: VisualRecognitionV3;

    constructor() {
        if (VisualRecognition.API) return;

        const config = Config.get(ConfigType.VisualRecognition);
        VisualRecognition.API = new VisualRecognitionV3({
            api_key: config.api_key,
            version_date: '2016-05-20'
        });
    }

    public classify(file: Buffer): Promise<ClassifyResult> {
        return this.request({ images_file: file });
    }

    private request(payload: ClassifyParams): Promise<ClassifyResult> {
        return new Promise<any>((resolve, reject) => {
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
