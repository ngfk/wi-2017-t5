import * as express from 'express';

import { VisualRecognition } from '../components/visual-recognition';

const router: express.Router = express.Router();

router.post('/test', async (req, res) => {
    const [file] = req.files;

    const vr = new VisualRecognition();
    const result = await vr.classify(file.buffer);

    res.json(result);
});

export const routerVisual = router;
