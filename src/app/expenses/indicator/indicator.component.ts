import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'

import { ExpensesService } from '../expenses.service'
import { environment } from '../../../environments/environment'

@Component({
    selector: 'app-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.css'],
    providers: [ ExpensesService]
})
export class IndicatorComponent implements OnInit {

    private average: number
    private temperature: Temperature = 'UNKNOWN'

    constructor(private expensesService: ExpensesService) { }

    ngOnInit() {
        this.getAverage()
    }

    getAverage() {
        this.expensesService.getExpenses().subscribe(expenses => {
            const total = expenses.map(expense => expense.amount)
                .reduce((previous: number, current: number): number => {
                    return previous + current;
                })
            this.average = total / +moment().toDate().getDate()
            if (this.average < environment.thresholdLower) { this.temperature = 'NORMAL'}
            if (this.average > environment.thresholdLower && this.average < environment.thresholdLimit) { this.temperature = 'MIDDLE'}
            if (this.average > environment.thresholdLimit) { this.temperature = 'HIGH'}


            console.log('TEMPERATURE', this.temperature)
        })
    }
}

type Temperature = 'HIGH' | 'MIDDLE' | 'NORMAL' | 'UNKNOWN'

