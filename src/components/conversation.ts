import { ConversationV1 } from 'watson-developer-cloud';
import {
    Context,
    MessageParams,
    MessageResponse
} from 'watson-developer-cloud/conversation/v1-generated';

import { Config, ConfigType } from '../models/config';
import {
    ConversationContext,
    ConversationVariable
} from '../models/conversation-context';

export class Conversation {
    private static API: ConversationV1;
    private static WORKSPACE: string;

    private context: Context;

    constructor() {
        this.context = new ConversationContext() as any;
        if (Conversation.API) return;

        const config = Config.get(ConfigType.Conversation);
        Conversation.API = new ConversationV1({
            username: config.username,
            password: config.password,
            version_date: '2017-05-26'
        });
        Conversation.WORKSPACE = config.workspace;
    }

    public setContext<T extends ConversationVariable>(
        variable: T,
        value: any
    ): this {
        (this.context as any)[variable] = value;
        return this;
    }

    public async message(text?: string): Promise<string[]> {
        const data = await this.request({
            workspace_id: Conversation.WORKSPACE,
            context: { ...this.context },
            input: { text: text! }
        });

        this.context = data.context;
        return data.output.text;
    }

    private request(payload: MessageParams): Promise<MessageResponse> {
        return new Promise((resolve, reject) => {
            Conversation.API.message(payload, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}
