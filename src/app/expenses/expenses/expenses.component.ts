import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ExpensesService } from './../expenses.service';
import { Expense } from './../expense.models';

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
                console.log('expenses', expenses)
                this.expenses = expenses;
            },
            err => {
                console.error('em-error', err);
            });
    }

    deleteExpense(id: string, rev: string) {
        console.log('id', id);
        console.log('rev', rev);
        this.expensesService.deleteExpense(id, rev).subscribe(
            () => this.getExpenses(),
            error => console.error('em-error', error));
    }
}
