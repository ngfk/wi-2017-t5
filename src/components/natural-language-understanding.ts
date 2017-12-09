import { NaturalLanguageUnderstandingV1 } from 'watson-developer-cloud';
import {
    AnalysisResults,
    AnalyzeParams
} from 'watson-developer-cloud/natural-language-understanding/v1';

const api = new NaturalLanguageUnderstandingV1({
    username: '9e2c4496-7279-4ea1-835b-9c7ff25a2fc6',
    password: 'Rr6ZqPYZ4kwb',
    version_date: '2017-02-27'
});

export class NaturalLanguageUnderstanding {
    public async analyze(analyzeData: string): Promise<AnalysisResults> {
        const payload: AnalyzeParams = {
            text: analyzeData,
            features: {
                keywords: { emotion: true, sentiment: true },
                categories: {}
            }
        };
        const data = await this.request(payload);
        return data;
    }

    private request(payload: AnalyzeParams): Promise<AnalysisResults> {
        return new Promise<any>((resolve, reject) => {
            api.analyze(payload, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
