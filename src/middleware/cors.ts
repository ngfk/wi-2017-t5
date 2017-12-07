import * as cors from 'cors';
import { RequestHandler } from 'express-unless';

export const middlewareCors: RequestHandler = cors({
    origin: [
        'http://localhost:8080',
        'http://localhost:8100',
        'https://ngfk.github.io'
    ]
});
