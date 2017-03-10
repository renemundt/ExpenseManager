import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Expense } from '../expense.models';
import { ExpensesService } from '../expenses.service';

@Component({
    selector: 'app-expense-details',
    templateUrl: './expense-details.component.html',
    styleUrls: ['./expense-details.component.css'],
    providers: [ExpensesService]
})
export class ExpenseDetailsComponent implements OnInit {

    disableInput = true;
    @Input() expense: Expense;

    constructor(private expensesService: ExpensesService, private activatedRoute: ActivatedRoute) { }


    private parseDateToStringWithFormat(date: Date): string {
        let result: string;
        date = date instanceof Date ? date : new Date(date);
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
        console.log('this.expense.timestamp', this.expense.timestamp)
        return this.parseDateToStringWithFormat(this.expense.timestamp);
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];
        this.expensesService.getExpense(id)
            .subscribe(
            expense => {
                this.expense = expense;
                this.disableInput = true;
            },
            error => {
                console.error('em-error', error);
            })
    }

    edit() {
        this.disableInput = false;
    }

}
