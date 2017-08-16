import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Expense } from './../expense.models'
import { ExpensesService } from '../expenses.service'
import { TemperatureService } from '../../shared/temperature.service'

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
        private temperatureService: TemperatureService
        ) { }

    ngOnInit() {
        const now = new Date();
        this.expense.timestamp = new Date(now.getTime())
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
