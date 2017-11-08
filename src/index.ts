import * as bodyParser from 'body-parser';
import { getAppEnv } from 'cfenv';
import * as cors from 'cors';
import * as express from 'express';
import { join } from 'path';

import convervation from './controllers/conversation';

const app = express();
const appEnv = getAppEnv();

app.use('/public', express.static(join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(
    cors({
        origin: [
            'http://localhost:8080',
            'http://localhost:8100',
            'https://ngfk.github.io'
        ]
    })
);

app.use('/api/conversation', convervation);

app.get('/', (req, res) => {
    res.redirect('/public');
    res.end();
});

app.listen(appEnv.port, '0.0.0.0', () => {
    console.log('server started on ' + appEnv.url);
});
