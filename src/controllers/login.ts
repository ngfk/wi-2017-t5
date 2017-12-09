import * as express from 'express';

import { UserParser } from '../components/user-parser';
import { profiles } from '../models/user-profile';
import { UserToken } from '../models/user-token';

const router: express.Router = express.Router();

router.post('/', (req, res) => {
    const { deviceId, name, post } = req.body;
    const parser = new UserParser(name);

    // Create authorization token for the new user
    const userToken = UserToken.create(deviceId);
    console.log(`[login] new user ${userToken.id}, device: ${deviceId}`);

    // Parse user posts
    if (!Array.isArray(post)) {
        parser.addPost(post);
    } else {
        post.forEach(p => parser.addPost(p));
    }

    // Parse user images
    for (let file of req.files) {
        if (file.fieldname !== 'image') continue;
        parser.addImage(file.buffer);
    }

    // Don't `await` the parsing to finish the login request before parsing is
    // complete.
    parser.parse().then(userProfile => {
        // TODO: where to store the user profile?
        console.log(`[login] user profile ${userToken.id} complete`);
        profiles.set(userToken.id, userProfile);
    });

    // Return the JWT to the user
    res.end(userToken.getToken());
});

export const routeLogin = router;
