import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Expense } from './expense.models';
import { environment } from '../../environments/environment'

import * as moment from 'moment'

@Injectable()
export class ExpensesService {

    constructor(private http: Http) { }

    getExpenses(): Observable<Expense[]> {


        let date = new Date()
        let currentMonth = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1)
        let currentYear = date.getFullYear()

        let startKey = `"${moment().format('YYYY')}-${moment().format('MM')}-01T00:00:00Z"`
        let endKey = `"${moment().format('YYYY')}-${moment().format('MM')}-${moment().daysInMonth()}T23:59:59Z"`

        const url = `${environment.url}/_design/timestamp/_view/expenses-view?startkey=${startKey}&endkey=${endKey}&include_docs=true`;
        
        return this.http.get(url)
            .map((response: Response) =>  response.json().rows.map(x => x.doc as Expense));
    }

    getExpense(id: string): Observable<Expense> {
        const url = `${environment.url}/${id}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as Expense);
    }

    createExpense(expense: Expense): Observable<Response> {
        return this.http.post(environment.url, JSON.stringify(expense), { headers: environment.headers })
            .map((response: Response) => response);
    }

    updateExpense(expense: Expense): Observable<Response> {
        const url = `${environment.url}/${expense._id}`;
        return this.http.put(url, JSON.stringify(expense), { headers: environment.headers})
            .map((response: Response) => response);
    }

    deleteExpense(id: string, rev: string): Observable<void> {
        const url = `${environment.url}/${id}?rev=${rev}`;
        return this.http.delete(url, {headers: environment.headers }).map(() => null);
    }
}

export class RequestResult {
    Success: boolean;
    Message: string;
}