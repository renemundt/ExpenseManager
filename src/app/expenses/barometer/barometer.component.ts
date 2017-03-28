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

    expenses: Expense[] = []
    barometerExpenses: BarometerExpense[] = []

    constructor(private expenseService: ExpensesService) { }

    ngOnInit() {
        this.getExpenses()
    }

    getExpenses() {
        this.expenseService.getExpenses()
            .subscribe(expenses => {
                let sortedExpenses: Expense[] = this.sortExpenses(expenses)
                const barometerExpenses = this.mapReduce(sortedExpenses)
                this.barometerExpenses = this.sortBarometerExpenses(barometerExpenses)
            },
            error => {
                console.error('em-error', error)
            })
    }

    mapReduce(expenses: Expense[]): BarometerExpense[] {
        let monthToDayAmountCnt = 0;
        const result = expenses.reduce(function (res, currentValue) {
            const tempDate = moment(currentValue.timestamp).format('YYYY-MM-DD')
            if (res.indexOf(tempDate) === -1) {
                res.push(tempDate);
            }
            return res;
        }, []).map(function (timestamp, index) {
            const tAmount = this.getTotalAmountPerDay(expenses, timestamp)
            monthToDayAmountCnt += tAmount;
            console.log('monthToDayAmountCnt', monthToDayAmountCnt)
            console.log('timestamp', timestamp)
            return {
                timestamp: moment(timestamp).toDate(),
                totalAmount: tAmount,
                monthToDayAmount: monthToDayAmountCnt,
                average: monthToDayAmountCnt / moment(timestamp).toDate().getDate()
            };
        }, this);
        return result;
    }

    private getTotalAmountPerDay(expenses: Expense[], timestamp: string): number {
        const result = expenses.filter(function (expense) {
            return moment(expense.timestamp).format('YYYY-MM-DD') === timestamp;
        }).map(function (expense) { return expense.amount; })
            .reduce((previous: number, current): number => {
                return previous + current;
            })
        return result;
    }

    private sortExpenses(expenses: Expense[]): Expense[] {
        return expenses.sort(function (a, b) {
            a.timestamp = new Date(a.timestamp);
            b.timestamp = new Date(b.timestamp);
            return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;
        });
    }

    private sortBarometerExpenses(expenses: BarometerExpense[]): BarometerExpense[] {
        return expenses.sort(function (a, b) {
            a.timestamp = new Date(a.timestamp);
            b.timestamp = new Date(b.timestamp);
            return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
        });
    }


}
