import * as bodyParser from 'body-parser';
import { RequestHandler } from 'express-unless';
import * as multer from 'multer';

export const middlewareJson: RequestHandler = bodyParser.json();

export const middlewareForm: RequestHandler = multer({
    storage: multer.memoryStorage()
}).any();
