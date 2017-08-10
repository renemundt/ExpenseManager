import { Observable } from 'rxjs/Observable'
import { Expense } from './expense.models'
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { ExpensesInMemoryService } from './expenses-inmemory.service'
import { ExpensesCouchService } from './expenses-couch.service'

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

    createExpensesService(kind: ServiceKind): AbstractService {
        switch(kind) {
            case ServiceKind.CouchDb:
                return this.expensesCouchService;
            case ServiceKind.InMemory:
                return this.expensesInMemoryService;
        }
    }

}

export enum ServiceKind {
    CouchDb,
    Mongo,
    InMemory
}
