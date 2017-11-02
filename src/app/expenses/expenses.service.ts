import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Expense } from './expense.models';
import { Http, Response, Headers } from '@angular/http';

import { environment } from '../../environments/environment'

import * as moment from 'moment'

@Injectable()
export class ExpensesService {

    headers = new Headers({'Content-Type': 'application/json',  Authorization: `Bearer ${this.getAccessToken()}` })

    constructor(private http: Http) { }

    getExpenses(): Observable<Expense[]> { // TODO: deliver start- and endDate via Parameters
        const presentDay = moment()
        const sameDayLastMonth = moment().subtract(1, 'months')

        const startDate = `${sameDayLastMonth.format('YYYY')}-${sameDayLastMonth.format('MM')}-${sameDayLastMonth.daysInMonth()}T23:59:59.000Z`
        const endDate = `${presentDay.format('YYYY')}-${presentDay.format('MM')}-${presentDay.daysInMonth()}T23:59:59.000Z`

        const url = `${environment.url}expenses?startDate=${startDate}&endDate=${endDate}`;

        return this.http.get(url, { headers: this.headers })
            .map((response: Response) =>
            response.json().map(x => x as Expense));
    }

    getExpense(id: string): Observable<Expense> {
        const url = `${environment.url}expenses/${id}`;
        return this.http.get(url, { headers: this.headers })
            .map((response: Response) => response.json() as Expense);
    }

    createExpense(expense: Expense): Observable<Response> {
        return this.http.post(`${environment.url}expenses/`, JSON.stringify(expense), { headers: this.headers })
            .map((response: Response) => response);
    }

    updateExpense(expense: Expense): Observable<Response> {
        const url = `${environment.url}expenses/${expense.id}`;
        return this.http.put(url, JSON.stringify(expense), { headers: this.headers})
            .map((response: Response) => response);
    }

    deleteExpense(id: string): Observable<void> {
        const url = `${environment.url}expenses/${id}`;
        return this.http.delete(url, {headers: this.headers }).map(() => null);
    }

    public getAccessToken(): string {
        return localStorage.getItem('access_token')
  }

}

