import * as express from 'express';
import * as watson from 'watson-developer-cloud';

const router: express.Router = express.Router();

var visual_recognition = watson.visual_recognition({
    api_key: 'ff0e720cf4b833cb6f59c16587a36c847acb1403',
    version: 'v3',
    version_date: '2016-05-20'
});

router.post('/test', (req, res) => {
    var params = {
        images_file: req.files[0].buffer
    };

    var result = {};
    visual_recognition.classify(params, function(err: any, res: any) {
        if (err) {
            console.log(err);
        } else {
            result = JSON.stringify(res, null, 2);
            console.log(result);
        }
    });

    res.json(result);
});

export const routerVisual = router;
