import * as express from 'express';

import { Conversation } from '../watson/conversation';

const router: express.Router = express.Router();

const conversation = new Conversation();

router.post('/message', async (req, res) => {
    const token = req.get('Authorization');
    const response = await conversation.message(req.body.text || '', token);
    res.json({ text: response });
});

export const routerConversation = router;
