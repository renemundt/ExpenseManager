import { Observable } from 'rxjs/Observable'

import { Expense } from './expense.models'
import { AbstractService } from './expenses.factory'
import { Response } from '@angular/http';


export class ExpensesInMemoryService implements AbstractService {
    getExpense(id: string): Observable<Expense> {
        throw new Error('Method not implemented.');
    }
    createExpense(expense: Expense): Observable<Response> {
        throw new Error('Method not implemented.');
    }
    updateExpense(expense: Expense): Observable<Response> {
        throw new Error('Method not implemented.');
    }
    deleteExpense(id: string, rev: string): Observable<void> {
        throw new Error('Method not implemented.');
    }
    getExpenses(): Observable<Expense[]> {
        throw new Error('Method not implemented.');
    }
}