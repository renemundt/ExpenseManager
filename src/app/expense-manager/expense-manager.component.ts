import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { AuthService } from '../auth/auth.service'

@Component({
    selector: 'app-expense-manager',
    templateUrl: './expense-manager.component.html',
    styleUrls: ['./expense-manager.component.css']
})
export class ExpenseManagerComponent implements OnInit {

    authorizationService: AuthService

    constructor(
        private authService: AuthService,
        private router: Router,
        private activedRoute: ActivatedRoute ) {
        authService.handleAuthenticationWithHash();
        this.authorizationService = this.authService
     }

    ngOnInit() {
        this.authService.userAuthenticated$.subscribe(() => {
            setTimeout(() => this.router.navigate(['barometer']), 6000)
        })
    }

}
