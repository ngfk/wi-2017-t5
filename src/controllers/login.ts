import * as express from 'express';

import { Matcher } from '../components/matcher';
import { UserParser } from '../components/user-parser';
import { DataStore } from '../models/data-store';
import { UserToken } from '../models/user-token';

const router: express.Router = express.Router();

router.post('/', async (req, res) => {
    const { name, post } = req.body;
    const parser = new UserParser(name);

    // Create authorization token for the new user
    const userToken = UserToken.create(name);
    console.log(`[login] new user ${userToken.name}, with id: ${userToken.id}`);

    // Parse user posts
    if (!Array.isArray(post)) parser.addPost(post);
    else post.forEach(p => parser.addPost(p));

    // Parse user images
    for (let file of req.files || []) {
        if (file.fieldname !== 'image') continue;
        parser.addImage(file.buffer);
    }

    const userProfile = await parser.parse();
    console.log(`[login] user profile for ${userToken.id} complete`);

    DataStore.setUserProfile(userToken, userProfile);

    const matcher = new Matcher(userToken);
    const cityProfile = matcher.match();

    DataStore.getConversation(userToken)
        .setContext('crawled', true)
        .setCityProfile(cityProfile);

    // Return the JWT to the user
    res.end(userToken.getToken());
});

export const routeLogin = router;
