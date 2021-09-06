import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { ConfigurationService } from '../configuration/configuration.service';
//import { of } from 'rxjs/add/observable';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
        private config: ConfigurationService) {
        
            let currentUser: string = localStorage.getItem('currentUser') ?? '{}';
        
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser));
            this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        let loginUrl: string = this.config.get()?.loginUrl ?? '';

        return this.http.post<any>(loginUrl, { username, password })
            .pipe(map((user: any) => {
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


        //return Observable.of(new TestModel()).map(o => JSON.stringify(o));

        //return false; //moment().isBefore(this.getExpiration());

        const promise = new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
          
        return promise;
    }

    // isLoggedOut() {
    //     return !this.isLoggedIn();
    // }

}