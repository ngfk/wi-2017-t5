import { getAppEnv } from 'cfenv';
import * as express from 'express';
import { join } from 'path';

import { routerConversation } from './controllers/conversation';
import { routeLogin } from './controllers/login';
import { UserProfile } from './controllers/userprofile';
import { routerVisual } from './controllers/visual';
import { middlewareCors } from './middleware/cors';
import { middlewareJwt } from './middleware/jwt';
import { middlewareForm, middlewareJson } from './middleware/parsing';
import { UserToken } from './models/user-token';

const app = express();
const appEnv = getAppEnv();
const uP = new UserProfile();

app.use(middlewareJson);
app.use(middlewareForm);
app.use(middlewareCors);
app.use(middlewareJwt);

app.use('/public', express.static(join(__dirname, '../public')));
app.use('/api/conversation', routerConversation);
app.use('/api/visual', routerVisual);
app.use('/api/login', routeLogin);

app.get('/', (req, res) => {
    res.redirect('/public');
    res.end();
});

app.listen(appEnv.port, '0.0.0.0', () => {
    console.log('server started on ' + appEnv.url);
    console.log('DEBUG TOKEN: ' + UserToken.create('debug').getToken());
});
