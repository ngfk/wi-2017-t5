import { VisualRecognitionV3 } from 'watson-developer-cloud';

const api = new VisualRecognitionV3({
    api_key: 'ff0e720cf4b833cb6f59c16587a36c847acb1403',
    version_date: '2016-05-20'
});

interface ClassifyParams {
    images_file: Buffer;
}

export interface ClassifyResult {
    // TODO...
}

export class VisualRecognition {
    public classify(file: Buffer): Promise<ClassifyResult> {
        return this.request({ images_file: file });
    }

    private request(payload: ClassifyParams): Promise<ClassifyResult> {
        return new Promise<any>((resolve, reject) => {
            api.classify(payload, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
