import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ExpensesService } from './../expenses.service';
import { Expense } from './../expense.models';

import { ConfirmEvent } from '../../shared/confirm/confirm.models';

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css'],
    providers: [ ExpensesService]
})
export class ExpensesComponent implements OnInit {

    private expenses: Expense[];

    constructor(private expensesService: ExpensesService) { }

    ngOnInit() {
        this.getExpenses();
    }

    getExpenses() {
        return this.expensesService.getExpenses()
            .subscribe(
            (expenses: Expense[]) => {
                this.expenses = this.sortExpenses(expenses);
            },
            err => {
                console.error('em-error', err);
            });
    }

    deleteExpense(id: string, rev: string) {
        this.expensesService.deleteExpense(id, rev).subscribe(
            () => this.getExpenses(),
            error => console.error('em-error', error));
    }

    onConfirmed(confirmEvent: ConfirmEvent) {
        this.deleteExpense(confirmEvent.id, confirmEvent.rev);
    }

    private sortExpenses(expenses: Expense[]): Expense[] {

        return expenses.sort(function(a, b) {
            a.timestamp = new Date(a.timestamp);
            b.timestamp = new Date(b.timestamp);
            return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
        });

    }
}
