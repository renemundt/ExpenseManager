import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Expense } from './expense.models';
import { environment } from '../../environments/environment'

import * as moment from 'moment'

@Injectable()
export class ExpensesCouchService  {

    constructor(private http: Http) { }

    getExpenses(): Observable<Expense[]> {
        const presentDay = moment()
        const sameDayLastMonth = moment().subtract(1, 'months')

        const startKey = `"${sameDayLastMonth.format('YYYY')}-${sameDayLastMonth.format('MM')}-${sameDayLastMonth.daysInMonth()}T23:59:59Z"`
        const endKey = `"${presentDay.format('YYYY')}-${presentDay.format('MM')}-${presentDay.daysInMonth()}T23:59:59Z"`

        const url = `${environment.url}/_design/timestamp/_view/expenses-view?startkey=${startKey}&endkey=${endKey}&include_docs=true`;

        return this.http.get(url, { headers: environment.headers })
            .map((response: Response) =>  response.json().rows.map(x => x.doc as Expense));
    }

    getExpense(id: string): Observable<Expense> {
        const url = `${environment.url}/${id}`;
        return this.http.get(url, { headers: environment.headers })
            .map((response: Response) => response.json() as Expense);
    }

    createExpense(expense: Expense): Observable<Response> {
        return this.http.post(environment.url, JSON.stringify(expense), { headers: environment.headers })
            .map((response: Response) => response);
    }

    updateExpense(expense: Expense): Observable<Response> {
        const url = `${environment.url}/${expense.id}`;
        return this.http.put(url, JSON.stringify(expense), { headers: environment.headers})
            .map((response: Response) => response);
    }

    deleteExpense(id: string, rev: string): Observable<void> {
        const url = `${environment.url}/${id}?rev=${rev}`;
        return this.http.delete(url, {headers: environment.headers }).map(() => null);
    }
}
