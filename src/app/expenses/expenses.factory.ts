import { Observable } from 'rxjs/Observable'
import { Expense } from './expense.models'
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { ExpensesInMemoryService } from './expenses-inmemory.service'
import { ExpensesCouchService } from './expenses-couch.service'
import { environment } from '../../environments/environment'

export interface AbstractService {
    getExpenses(): Observable<Expense[]>
    getExpense(id: string): Observable<Expense>
    createExpense(expense: Expense): Observable<Response>
    updateExpense(expense: Expense): Observable<Response>
    deleteExpense(id: string, rev: string): Observable<void>
}

@Injectable()
export class ExpensesFactory {
        constructor(private expensesCouchService: ExpensesCouchService, private expensesInMemoryService: ExpensesInMemoryService) {}

    createExpensesService(): AbstractService {
        switch(environment.persistanceType) {
            case 'couchdb':
                return this.expensesCouchService;
            case 'inmemory':
                return this.expensesInMemoryService;
        }
    }
}
