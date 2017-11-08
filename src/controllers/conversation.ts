import * as express from 'express';
import { ConversationV1 } from 'watson-developer-cloud';

const router: express.Router = express.Router();

const conversation = new ConversationV1({
    username: '44a3a687-78fd-4e6e-ae3d-1e74a672857b',
    password: 'wphyaeyEhNVL',
    version_date: '2017-05-26'
});

router.post('/message', (req, res) => {
    const workspace =
        process.env.WORKSPACE_ID || '58b05904-964e-4f20-9d12-65eae67586c5';

    const payload = {
        workspace_id: workspace,
        context: req.body.context || {},
        input: req.body.input || {}
    };

    // Send the input to the conversation service
    conversation.message(payload, (err: any, data: any) => {
        if (err) {
            return res.status(err.code || 500).json(err);
        }

        return res.json({ context: data.context, text: data.output.text });
    });
});

export default router;
