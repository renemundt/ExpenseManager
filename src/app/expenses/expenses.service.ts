import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Expense } from './expense.models';
import { SharedService } from './../shared/shared.service';

@Injectable()
export class ExpensesService {

    constructor(private http: Http) { }

    getExpenses(): Observable<Expense[]>{
        const url = `${SharedService.baseurl}/_all_docs?include_docs=true`;
        return this.http.get(url)
            .map((response: Response) => response.json().rows.map(x => x.doc as Expense));
    }

    createExpense(expense: Expense): Observable<Response> {
        return this.http.post(SharedService.baseurl, JSON.stringify(expense), { headers: SharedService.headers })
            .map((response: Response) => response);
    }
}

export class RequestResult {
    Success: boolean;
    Message: string;
}