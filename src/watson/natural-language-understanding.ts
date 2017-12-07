import { NaturalLanguageUnderstandingV1 } from 'watson-developer-cloud';

export class NaturalLanguageUnderstanding {
    private api: any;
    private parameters: any;

    constructor(requestParams: any) {
        this.api = new NaturalLanguageUnderstandingV1({
            username: '9e2c4496-7279-4ea1-835b-9c7ff25a2fc6',
            password: 'Rr6ZqPYZ4kwb',
            version_date: '2017-02-27'
        });
        this.parameters = requestParams;
    }

    public async analyse(payload: any): Promise<any> {
        const data = await this.request(payload);
        return data;
    }

    private request(payload: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.api.analyse(payload, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}
