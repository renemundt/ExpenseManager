import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'

import { ExpensesService } from '../expenses.service'
import { environment } from '../../../environments/environment'
import { TemperatureService } from '../../shared/temperature.service'
import { ExpensesFactory } from '../expenses.factory';
import { ExpensesCouchService } from '../expenses-couch.service'
import { ExpensesInMemoryService } from '../expenses-inmemory.service'

@Component({
    selector: 'app-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.css'],
    providers: [ ExpensesService, ExpensesFactory, ExpensesCouchService, ExpensesInMemoryService]
})
export class IndicatorComponent implements OnInit {

    private average: number
    private temperature: Temperature = 'UNKNOWN'

    constructor(private expensesService: ExpensesService, private temperatureService: TemperatureService) { }

    ngOnInit() {
        this.getAverage()
        this.temperatureService.expensesTouched$.subscribe(
            expense => this.getAverage()
        )
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
        })
    }
}

type Temperature = 'HIGH' | 'MIDDLE' | 'NORMAL' | 'UNKNOWN'

