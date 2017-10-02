import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'

import { ExpensesService } from '../expenses.service'
import { environment } from '../../../environments/environment'
import { TemperatureService } from '../../shared/temperature.service'

@Component({
    selector: 'app-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {

    average: number
    temperature: Temperature = 'UNKNOWN'

    constructor(private expensesService: ExpensesService, private temperatureService: TemperatureService) { }

    ngOnInit() {
        this.setAverage()
        this.temperatureService.expensesTouched$.subscribe(
            expense => this.setAverage()
        )
    }

    setAverage() {
        this.expensesService.getExpenses().subscribe(expenses => {
            console.log('expenses', expenses)
            console.log('expenses.length', expenses.length)
            if (expenses.length === 0) {
                this.average = 0
                this.temperature = 'NORMAL'
                return
            }
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

