import { ConversationV1 } from 'watson-developer-cloud';

export type ConversationPayload = {
    text?: string;

    context?: any;
    workspace_id?: any;
};

export class Conversation {
    private api: any;
    private context: { [token: string]: any };
    private workspace = '58b05904-964e-4f20-9d12-65eae67586c5';

    constructor() {
        this.api = new ConversationV1({
            username: '44a3a687-78fd-4e6e-ae3d-1e74a672857b',
            password: 'wphyaeyEhNVL',
            version_date: '2017-05-26'
        });
    }

    public async message(token: string, text?: string): Promise<string> {
        const context = token ? this.context[token] : undefined;
        const data = await this.request({ context });
        return data.output.text;
    }

    private request(payload: ConversationPayload = {}): Promise<any> {
        payload = {
            context: this.context,
            workspace_id: this.workspace,
            ...payload
        };

        return new Promise<any>((resolve, reject) => {
            this.api.message(payload, (err: any, data: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
