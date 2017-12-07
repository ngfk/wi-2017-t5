import * as jwt from 'express-jwt';
import { RequestHandler } from 'express-unless';

const secret = process.env.JWT_SECRET || 'unsecure-secret';

export const middlewareJwt: RequestHandler = jwt({ secret }).unless({
    path: ['/api/login']
});
