import { sign, verify } from 'jsonwebtoken';
import * as uuid from 'uuid';

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) throw new Error('No JWT_SECRET env variable defined!.');
const secret = JWT_SECRET;

export interface UserTokenPayload {
    readonly id: string;
    readonly name: string;
}

export class UserToken implements UserTokenPayload {
    public readonly id: string;
    public readonly deviceId: string;
    public readonly name: string;

    constructor(payload: UserTokenPayload) {
        this.id = payload.id || uuid.v4();
        this.name = payload.name;
    }

    public static create(name: string): UserToken {
        return new UserToken({
            id: undefined as any,
            name
        });
    }

    public static fromToken(token: string): UserToken {
        const payload: UserTokenPayload = verify(token, secret, {
            algorithms: ['HS256']
        }) as any;

        return new UserToken(payload);
    }

    public getToken(): string {
        return sign(JSON.stringify(this), secret, {
            algorithm: 'HS256'
        });
    }
}
