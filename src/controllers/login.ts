import * as express from 'express';

import { Matcher } from '../components/matcher';
import { UserParser } from '../components/user-parser';
import { DataStore } from '../models/data-store';
import { UserToken } from '../models/user-token';

const router: express.Router = express.Router();

router.post('/', (req, res) => {
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

    // Don't `await` the parsing to finish the login request before parsing is
    // complete.
    parser.parse().then(userProfile => {
        console.log(`[login] user profile for ${userToken.id} complete`);

        const enoughPreferences = !Object.keys(userProfile.scores)
            .map(key => userProfile.scores[key])
            .every(score => score === 0);

        DataStore.setUserProfile(userToken, userProfile);

        const matcher = new Matcher(userToken);
        const cityProfile = matcher.match();

        DataStore.getConversation(userToken)
            .setContext('crawled', true)
            .setContext('enough_preferences', enoughPreferences)
            .setCityProfile(cityProfile);
    });

    // Return the JWT to the user
    res.end(userToken.getToken());
});

export const routeLogin = router;
