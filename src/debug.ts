import { readFile as nodeReadFile } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { promisify } from 'util';

import { UserParser } from './components/user-parser';
import { DataStore } from './models/data-store';
import { UserToken } from './models/user-token';

const rl = createInterface({
    input: process.stdin,
    output: undefined
});

const read = () =>
    new Promise<string>(resolve => rl.question('', answer => resolve(answer)));

const readFile = promisify(nodeReadFile);

const readImage = (name: string): Promise<Buffer> => {
    const path = join(__dirname, '../images', name);
    return readFile(path);
};

const setupUser = async () => {
    const user = UserToken.create('Joost');
    const parser = new UserParser(user.name);

    // prettier-ignore
    const profile = await parser
        .addPost('Just had the most amazing sri lankian dish')
        .addPost('The beautiful scenery of Tuscany, Italy')
        .addPost('No filter needed!!! The untouched west coast of Australia is simply stunning!!')
        .addPost('Hi guys! My friend Justine and I are in surfers paradise and we would like to go to Killarney glen tomorrow to see the heart shaped pool and go for a walk, anyone going that way with spare seats? We will chip in for gas :)')
        .addPost('Just had the most amazing sri lankian dish')
        .addPost('Luckily Adams Peack is open again')
        .addPost("Yes, I'm a celebrity stalker!!")
        .addPost("Kinabatangan river it's pretty nice or in Kalimantan maratua Island. ;)")
        .addPost("Hi everyone! I'm planning to go to Kalimantan doing a boat tour through Tanjung Puting National Park around the 18/19th December. Anyone here planning on doing the same? Doing it solo is quite expensive, and as it is low season it is unsure to find a group once I'm there. If someone plans on doing it around that time as well, please contact me :)")
        .addPost("I'm keen to go explore the city of BUENOS AIRES")
        .addPost('Great concert last night in London with the Dublin Legends')
        .addPost("And now it's time for a nice cold beer at a terrace")
        .addPost('Watching soccer')
        .addPost('The tickets for "the dubliners" came today :D')
        .addImage(await readImage('test.jpg'))
        .parse();

    DataStore.setUserProfile(user, profile);
    return user;
};

export const main = async () => {
    const user = await setupUser();
    const conversation = DataStore.getConversation(user);

    conversation
        .setContext('crawled', true)
        .setContext('enough_preferences', false);

    const start = await conversation.message();
    console.log('[%s]\n%s\n', 'Watson', start.join('\n'));

    while (true) {
        console.log(`[${user.name}]`);
        const input = await read();
        console.log();

        const output = await conversation.message(input);
        console.log('[%s]\n%s\n', 'Watson', output.join('\n'));
    }
};

(() => require.main === module && main())();
