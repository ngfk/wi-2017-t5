import * as express from 'express';

import { UserToken } from '../models/user-token';

const router: express.Router = express.Router();

router.post('/', (req, res) => {
    const { deviceId } = req.body;
    const userToken = UserToken.create(deviceId);
    res.end(userToken.getToken());
});

export const routeLogin = router;
