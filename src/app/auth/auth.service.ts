import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
// import { Auth0Lock } from 'auth0-lock'
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject'

import { authConfig } from './auth.config';

// Avoid name not found warnings
declare var Auth0Lock: any;


@Injectable()
export class AuthService {

    private userAuthenticatedSource = new Subject<void>()

    userAuthenticated$ = this.userAuthenticatedSource.asObservable()

    lock = new Auth0Lock(authConfig.clientID, authConfig.domain, {});

    constructor(private router: Router) {
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);

            this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
                if (error) {
                    // Handle error
                    return;
                }
                localStorage.setItem('profile', JSON.stringify(profile));
            });

            this.userAuthenticatedSource.next()
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated(): boolean {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        let token = localStorage.getItem('id_token');
        return tokenNotExpired('id_token', token)
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
    };

    public isLoggedIn() {
        const idToken = localStorage.getItem('id_token')
    }

    public handleAuthenticationWithHash(): void {
        this
            .router
            .events
            .filter(event => event.constructor.name === 'NavigationStart')
            .filter(event => (/access_token|id_token|error/).test(event.url))
            .subscribe(event => {
                this.lock.resumeAuth(window.location.hash, (error, authResult) => {
                    if (error) return console.log(error);
                    this.setUser(authResult);
                    this.router.navigateByUrl('/');
                });
            });
    }

    private setUser(authResult): void {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
    }

}
