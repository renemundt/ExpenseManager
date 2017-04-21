import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService } from '../auth/auth.service'

@Component({
    selector: 'app-expense-manager',
    templateUrl: './expense-manager.component.html',
    styleUrls: ['./expense-manager.component.css']
})
export class ExpenseManagerComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
        authService.handleAuthenticationWithHash();
     }

    ngOnInit() {
        this.authService.userAuthenticated$.subscribe(() => {
            setTimeout(() => this.router.navigate(['barometer']), 2000)
        })
    }

}
