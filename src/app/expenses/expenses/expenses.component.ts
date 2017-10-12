import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { ExpensesService } from './../expenses.service'
import { Expense } from './../expense.models'
import { TemperatureService } from '../../shared/temperature.service'

import { ConfirmEvent } from '../../shared/confirm/confirm.models'

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

    public loading = true
    public expenses: Expense[]

    constructor(
        private expensesService: ExpensesService,
        private temperatureService: TemperatureService
    ) { }

    ngOnInit() {
        this.getExpenses()
    }

    getExpenses() {
        return this.expensesService.getExpenses()
            .subscribe((expenses: Expense[]) => {
                this.expenses = this.sortExpenses(expenses)
                this.loading = false
            },
            error => {
                console.error('em-error', error)
            })
    }

    deleteExpense(id: string) {
        this.expensesService.deleteExpense(id).subscribe(
            () => {
                this.temperatureService.touchExpenses()
                this.getExpenses()
            },
            error => console.error('em-error', error))
    }

    onConfirmed(confirmEvent: ConfirmEvent) {
        this.deleteExpense(confirmEvent.id)
    }

    private sortExpenses(expenses: Expense[]): Expense[] {
        return expenses.sort(function (a, b) {
            a.created = new Date(a.created)
            b.created = new Date(b.created)
            return a.created > b.created ? -1 : a.created < b.created ? 1 : 0
        })
    }
}
