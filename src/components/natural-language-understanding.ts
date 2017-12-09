import { NaturalLanguageUnderstandingV1 } from 'watson-developer-cloud';
import {
    AnalysisResults,
    AnalyzeParams
} from 'watson-developer-cloud/natural-language-understanding/v1';

import { Config, ConfigType } from '../models/config';

export class NaturalLanguageUnderstanding {
    private static API: NaturalLanguageUnderstandingV1;

    constructor() {
        if (NaturalLanguageUnderstanding.API) return;

        const config = Config.get(ConfigType.NaturalLanguageUnderstanding);
        NaturalLanguageUnderstanding.API = new NaturalLanguageUnderstandingV1({
            username: config.username,
            password: config.password,
            version_date: '2017-02-27'
        });
    }

    public analyze(analyzeData: string): Promise<AnalysisResults> {
        const payload: AnalyzeParams = {
            text: analyzeData,
            features: {
                sentiment: {},
                categories: {}
            }
        };

        return this.request(payload);
    }

    private request(payload: AnalyzeParams): Promise<AnalysisResults> {
        return new Promise<any>((resolve, reject) => {
            NaturalLanguageUnderstanding.API.analyze(payload, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
