import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Expense } from './expense.models';
import { Http, Response, Headers } from '@angular/http';

import { environment } from '../../environments/environment'

import { AbstractService, ExpensesFactory, ServiceKind } from './expenses.factory'

@Injectable()
export class ExpensesService implements AbstractService {

    private ExpensesService: AbstractService

    constructor(private expensesFactory: ExpensesFactory) {
        let serviceKind: ServiceKind = ServiceKind[localStorage.getItem('serviceKind')];
        if ( serviceKind == null ) { serviceKind = ServiceKind.CouchDb }
        this.ExpensesService = expensesFactory.createExpensesService(serviceKind) 
    }

    getExpenses(): Observable<Expense[]> {
        return this.ExpensesService.getExpenses()
    }
    getExpense(id: string): Observable<Expense> {
        return this.ExpensesService.getExpense(id)
    }
    createExpense(expense: Expense): Observable<Response> {
        return this.ExpensesService.createExpense(expense)
    }
    updateExpense(expense: Expense): Observable<Response> {
        return this.updateExpense(expense)
    }
    deleteExpense(id: string, rev: string): Observable<void> {
        return this.deleteExpense(id, rev)
    }
}

