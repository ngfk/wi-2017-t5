import * as watson from 'watson-developer-cloud';

const api = watson.visual_recognition({
    api_key: 'ff0e720cf4b833cb6f59c16587a36c847acb1403',
    version: 'v3',
    version_date: '2016-05-20'
});

interface VisualRecognitionPayload {
    images_file: Buffer;
}

export class VisualRecognition {
    public async classify(file: Buffer): Promise<any> {
        return this.request({ images_file: file });
    }

    private request<T = any>(payload: VisualRecognitionPayload): Promise<T> {
        return new Promise<any>((resolve, reject) => {
            api.classify(payload, (err: any, data: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
