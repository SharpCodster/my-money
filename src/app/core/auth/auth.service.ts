import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { ConfigurationService } from '../configuration/configuration.service';
import { LoggerService } from '../logger/log.service';
import * as moment from 'moment';
import { UserLoginRequest } from './user-login-request.model';
import { AuthResponse } from './auth-response.model';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    private currentUserSubject: BehaviorSubject<AuthResponse>;
    public currentUser: Observable<AuthResponse>;

    constructor(private http: HttpClient,
        private config: ConfigurationService,
        private logger: LoggerService) {
        
            this.logger.debug('Initializing AuthService...');

            let currentUserStr: string = localStorage.getItem('currentUser');
        
            let currentUser: AuthResponse = {
                succeeded: false,
                requiresTwoFactor: false,
                accessToken: '',
                accessTokenExpiration: null,
                refreshToken: '',
                refreshTokenExpiration: null,
                user: {
                    id: '',
                    userName: '',
                    email: '',
                    roles: [],
                }
            };

            if (currentUserStr) {
                currentUser = JSON.parse(currentUserStr);
            }

            this.currentUserSubject = new BehaviorSubject<AuthResponse>(currentUser);
            this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AuthResponse {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        let loginUrl: string = this.config.get()?.loginUrl ?? '';

        let loginRequest: UserLoginRequest = {
            email: username,
            password: password
        };

        return this.http.post<any>(loginUrl, loginRequest)
            .pipe(map((user: AuthResponse) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    public isLoggedIn(): Promise<boolean> {
        const promise = new Promise<boolean>((resolve, reject) => {
            if (this.currentUserValue.accessTokenExpiration != null) {
                let isBefore: boolean = moment().isBefore(this.currentUserValue.accessTokenExpiration);
                resolve(isBefore);
            } else {
                resolve(false);
            }
        });
        return promise;
    }
}