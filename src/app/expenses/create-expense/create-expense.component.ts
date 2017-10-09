import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Expense, Profile } from './../expense.models'
import { ExpensesService } from '../expenses.service'
import { TemperatureService } from '../../shared/temperature.service'
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-create-expense',
    templateUrl: './create-expense.component.html',
    styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

    expense = new Expense()

    constructor(
        private expensesService: ExpensesService,
        private router: Router,
        private temperatureService: TemperatureService,
        private authenticationService: AuthService
        ) { }

    ngOnInit() {
        const now = new Date();
        const userProfile = this.authenticationService.userProfile
        this.expense.timeOfPurchase = new Date(now.getTime())
        this.expense.profile = new Profile(userProfile.sub, userProfile.given_name)
    }

    onSubmit(): void {
        this.expensesService.createExpense(this.expense)
            .subscribe(
            data => {
                this.temperatureService.touchExpenses()
                this.router.navigate(['expenses'])
            },
            err => {
                console.error('em-error', err);
            }
            );
    }
}
