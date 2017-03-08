import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Expense } from './../expense.models';
import { ExpensesService } from '../expenses.service';

@Component({
    selector: 'app-create-expense',
    templateUrl: './create-expense.component.html',
    styleUrls: ['./create-expense.component.css'],
    providers: [ ExpensesService ]
})
export class CreateExpenseComponent implements OnInit {

    private timestamp: any;

    expense = new Expense();

    constructor(private expensesService: ExpensesService, private router: Router) { }

    ngOnInit() {
        const now = new Date();
        this.expense.timestamp = new Date(now.getTime());
    }

    private parseDateToStringWithFormat(date: Date): string {
        let result: string;
        let dd = date.getDate().toString();
        let mm = (date.getMonth() + 1).toString();
        dd = dd.length === 2 ? dd : '0' + dd;
        mm = mm.length === 2 ? mm : '0' + mm;

        result = [date.getFullYear(), '-', mm, '-', dd].join('');

        return result;
    }

    public set dateTimeLocal(v: string) {
        const actualParsedDate = v ? new Date(v) : new Date();
        const normalizedParsedDate = new Date(actualParsedDate.getTime() + (actualParsedDate.getTimezoneOffset() * 60000));
        this.expense.timestamp = normalizedParsedDate;
    }

    public get dateTimeLocal(): string {
        return this.parseDateToStringWithFormat(this.expense.timestamp);
    }

    createExpense(expense: Expense): void {
        this.expensesService.createExpense(expense)
            .subscribe(
                data => {
                    this.router.navigate(['expenses']);
                },
                err => {
                    console.error('em-error', err);
                }
            );
    }
}
