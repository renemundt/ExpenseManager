import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Expense } from '../expense.models'
import { ExpensesService } from '../expenses.service'
import { TemperatureService } from '../../shared/temperature.service'

@Component({
    selector: 'app-expense-details',
    templateUrl: './expense-details.component.html',
    styleUrls: ['./expense-details.component.css']
})

export class ExpenseDetailsComponent implements OnInit {

    disableInput = true
    @Input() expense: Expense

    constructor(
        private expensesService: ExpensesService,
        private temperatureService: TemperatureService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id']
        this.expensesService.getExpense(id)
            .subscribe(
            expense => {
                expense.timestamp = new Date(expense.timestamp)
                this.expense = expense
                this.disableInput = true
            },
            error => {
                console.error('em-error', error)
            })
    }

    edit() {
        this.disableInput = false
    }

    onSubmit() {
        this.expensesService.updateExpense(this.expense)
            .subscribe(() => {
                this.temperatureService.touchExpenses()
                this.router.navigate(['/expenses'])
        })
    }
}
