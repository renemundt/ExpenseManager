import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class TemperatureService {

    private expensesTouchedSource = new Subject<void>()

    expensesTouched$ = this.expensesTouchedSource.asObservable()

    touchExpenses() {
        this.expensesTouchedSource.next()
    }

}
