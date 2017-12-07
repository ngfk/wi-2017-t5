import * as jwt from 'express-jwt';
import { RequestHandler } from 'express-unless';

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) throw new Error('No JWT_SECRET env variable defined.');
const secret = JWT_SECRET;

export const middlewareJwt: RequestHandler = jwt({ secret }).unless({
    path: ['/api/login', '/api/visual/test']
});
