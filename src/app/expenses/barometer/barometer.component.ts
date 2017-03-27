import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'

import { ExpensesService } from '../expenses.service'
import { Expense, BarometerExpense } from '../expense.models'


@Component({
    selector: 'app-barometer',
    templateUrl: './barometer.component.html',
    styleUrls: ['./barometer.component.css'],
    providers: [ExpensesService]
})
export class BarometerComponent implements OnInit {

    expenses: BarometerExpense[] = []

    constructor(private expenseService: ExpensesService) { }

    ngOnInit() {
        this.getExpenses()
    }

    getExpenses() {
        this.expenseService.getExpenses()
            .subscribe(expenses => {
                this.expenses = this.mapReduce(expenses)
            },
            error => {
                console.error('em-error', error)
            })
    }

    mapReduce(expenses: Expense[]): BarometerExpense[] {

        const result = expenses.reduce(function (res, currentValue) {
            const tempDate = moment(currentValue.timestamp).format('YYYY-MM-DD')
            if (res.indexOf(tempDate) === -1) {
                res.push(tempDate);
            }
            return res;
        }, []).map(function (timestamp) {
            return {
                timestamp: moment(timestamp).toDate(),
                totalAmount: expenses.filter(function (expense) {
                    return moment(expense.timestamp).format('YYYY-MM-DD') === timestamp;
                }).map(function (expense) { return expense.amount; })
                    .reduce((previous: number, current): number => {
                        return previous + current;
                    })
            };
        });
        return result;
    }
}
