import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Expense } from './expense.models';
import { Http, Response, Headers } from '@angular/http';

import { environment } from '../../environments/environment'

import { AbstractService, ExpensesFactory} from './expenses.factory'

@Injectable()
export class ExpensesService implements AbstractService {

    private ExpensesService: AbstractService

    constructor(private expensesFactory: ExpensesFactory) {
        this.ExpensesService = expensesFactory.createExpensesService() 
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
        return this.ExpensesService.updateExpense(expense)
    }
    deleteExpense(id: string, rev: string): Observable<void> {
        return this.ExpensesService.deleteExpense(id, rev)
    }
}

