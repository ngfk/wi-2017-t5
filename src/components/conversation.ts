import { ConversationV1 } from 'watson-developer-cloud';
import {
    Context,
    MessageParams,
    MessageResponse
} from 'watson-developer-cloud/conversation/v1-generated';

const api = new ConversationV1({
    username: '44a3a687-78fd-4e6e-ae3d-1e74a672857b',
    password: 'wphyaeyEhNVL',
    version_date: '2017-05-26'
});

export class Conversation {
    private context: Context;
    private workspace = '58b05904-964e-4f20-9d12-65eae67586c5';

    public async message(text?: string): Promise<string[]> {
        const data = await this.request({
            workspace_id: this.workspace,
            context: this.context
        });

        this.context = data.context;
        return data.output.text;
    }

    private request(payload: MessageParams): Promise<MessageResponse> {
        return new Promise((resolve, reject) => {
            api.message(payload, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
