import * as express from 'express';
import * as watson from 'watson-developer-cloud';

const router: express.Router = express.Router();

var visual_recognition = watson.visual_recognition({
    api_key: '{api_key}',
    version: 'v3',
    version_date: '2016-05-20'
});

router.post('/test', (req, res) => {
    console.log(req.files);
    res.json({});

    // visual_recognition.classify(params, function(err: any, res: any) {
    //     if (err) console.log(err);
    //     else console.log(JSON.stringify(res, null, 2));
    // });
});

export default router;
