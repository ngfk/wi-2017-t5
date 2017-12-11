import * as express from 'express';

import { DataStore } from '../models/data-store';
import { UserToken } from '../models/user-token';

const router: express.Router = express.Router();

router.post('/message', async (req, res) => {
    try {
        // Extract authorization token & conversation instance
        const token = req.get('Authorization')!.slice('Bearer '.length);
        const userToken = UserToken.fromToken(token);
        const conversation = DataStore.getConversation(userToken);

        // Forward message to conversation
        const { text } = req.body;
        const response = await conversation.message(text);

        // Return response
        res.json(response);
    } catch (e) {
        console.log(e.message);
        res.end();
    }
});

export const routerConversation = router;
