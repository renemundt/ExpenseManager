import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Expense } from './expense.models';
import { SharedService } from './../shared/shared.service';

@Injectable()
export class ExpensesService {

    constructor(private http: Http) { }

    getExpenses(): Observable<Expense[]> {
        const url = `${SharedService.baseUrl}/_all_docs?include_docs=true`;
        return this.http.get(url)
            .map((response: Response) =>  response.json().rows.map(x => x.doc as Expense));
    }

    getExpense(id: string): Observable<Expense> {
        const url = `${SharedService.baseUrl}/${id}`;
        console.log('url', url)
        return this.http.get(url)
            .map((response: Response) => response.json() as Expense);

    }

    createExpense(expense: Expense): Observable<Response> {
        console.log('expense', expense)
        let jason = JSON.stringify(expense);
        console.log(jason);
        return this.http.post(SharedService.baseUrl, JSON.stringify(expense), { headers: SharedService.headers })
            .map((response: Response) => response);
    }
}

export class RequestResult {
    Success: boolean;
    Message: string;
}