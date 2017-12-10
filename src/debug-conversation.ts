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
    console.log();
    const start = await conv.message();
    console.log(`[watson]\n${start}\n`);

    while (true) {
        console.log('[user]');
        const input = await read();
        console.log('');

        const output = await conv.message(input);
        console.log(`[watson]\n${output}\n`);
    }
};

(() => require.main === module && main())();
