import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ExpensesComponent } from './expenses/expenses/expenses.component';
import { InitSystemComponent } from './expenses/init-system/init-system.component';
import { HeaderComponent } from './header/header.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { ExpenseDetailsComponent } from './expenses/expense-details/expense-details.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';

const ROUTES: Routes = [
  { path: '', component: InitSystemComponent },
  { path: 'create-expense', component: CreateExpenseComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expense-details/:id', component: ExpenseDetailsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    InitSystemComponent,
    HeaderComponent,
    CreateExpenseComponent,
    ExpenseDetailsComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
