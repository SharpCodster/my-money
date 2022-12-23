import { User } from './user.model';

export interface AuthResponse {
    succeeded: boolean,
    requiresTwoFactor: boolean,
    accessToken: string,
    accessTokenExpiration: Date,
    refreshToken: string,
    refreshTokenExpiration: Date,
    user: User
}
