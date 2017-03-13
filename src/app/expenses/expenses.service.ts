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
        return this.http.get(url)
            .map((response: Response) => response.json() as Expense);
    }

    createExpense(expense: Expense): Observable<Response> {
        return this.http.post(SharedService.baseUrl, JSON.stringify(expense), { headers: SharedService.headers })
            .map((response: Response) => response);
    }

    updateExpense(expense: Expense): Observable<Response> {
        const url = `${SharedService.baseUrl}/${expense._id}`;
        return this.http.put(url, JSON.stringify(expense), { headers: SharedService.headers})
            .map((response: Response) => response);
    }

    deleteExpense(id: string, rev: string): Observable<void> {
        const url = `${SharedService.baseUrl}/${id}?rev=${rev}`;
        return this.http.delete(url, {headers: SharedService.headers }).map(() => null);
    }
}

export class RequestResult {
    Success: boolean;
    Message: string;
}