import { ConversationV1 } from 'watson-developer-cloud';

const api = new ConversationV1({
    username: '44a3a687-78fd-4e6e-ae3d-1e74a672857b',
    password: 'wphyaeyEhNVL',
    version_date: '2017-05-26'
});

export type ConversationPayload = {
    input?: { text?: string };
    context?: any;
    workspace_id?: any;
};

export class Conversation {
    private context: any;
    private workspace = '58b05904-964e-4f20-9d12-65eae67586c5';

    public async message(text?: string): Promise<string[]> {
        const data = await this.request({ input: { text } });
        this.context = data.context;
        return data.output.text;
    }

    private request(payload: ConversationPayload = {}): Promise<any> {
        payload = {
            context: this.context,
            workspace_id: this.workspace,
            ...payload
        };

        return new Promise<any>((resolve, reject) => {
            api.message(payload, (err: any, data: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
