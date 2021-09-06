export class User {
    id: number = 0;
    username: string = '';
    email: string = '';
    token?: string = undefined;
    expiration?: Date = undefined;
}