import { createInterface } from 'readline';

import { Conversation } from './components/conversation';

const conv = new Conversation();

const rl = createInterface({
    input: process.stdin,
    output: undefined
});

const read = () => {
    return new Promise<string>(resolve => {
        rl.question('', answer => resolve(answer));
    });
};

export const main = async () => {
    conv.setContext('enough_preferences', false);

    const start = await conv.message();
    console.log('[watson]');
    start.forEach(s => console.log(s));
    console.log();

    while (true) {
        console.log('[user]');
        const input = await read();
        console.log();

        const output = await conv.message(input);
        console.log(`[watson]`);
        output.forEach(o => console.log(o));
        console.log();
    }
};

(() => require.main === module && main())();
