import * as express from 'express';

import { Conversation } from '../components/conversation';
import { UserToken } from '../models/user-token';

const router: express.Router = express.Router();

const conversations: { [id: string]: Conversation } = {};

router.post('/message', async (req, res) => {
    try {
        // Extract authorization token
        const token = req.get('Authorization')!.slice('Bearer '.length);
        const userToken = UserToken.fromToken(token);

        // Retrieve or create conversation instance
        if (!conversations[userToken.id])
            conversations[userToken.id] = new Conversation();
        const conversation = conversations[userToken.id];

        // Forward message to conversation
        const { text } = req.body;
        const response = await conversation.message(text);

        // Return response
        res.json({ text: response });
    } catch (e) {
        console.log(e.message);
        res.end();
    }
});

export const routerConversation = router;
