import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

import { AppComponent } from './app.component';
import { ExpensesComponent } from './expenses/expenses/expenses.component';
import { InitSystemComponent } from './expenses/init-system/init-system.component';
import { HeaderComponent } from './header/header.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { ExpenseDetailsComponent } from './expenses/expense-details/expense-details.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { BarometerComponent } from './expenses/barometer/barometer.component';
import { IndicatorComponent } from './expenses/indicator/indicator.component';

const ROUTES: Routes = [
  // { path: '', component: InitSystemComponent }, admin credentials needed to create database on smileupss
  { path: '', redirectTo: 'barometer', pathMatch: 'full' },
  { path: 'create-expense', component: CreateExpenseComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expense-details/:id', component: ExpenseDetailsComponent },
  { path: 'barometer', component: BarometerComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    InitSystemComponent,
    HeaderComponent,
    CreateExpenseComponent,
    ExpenseDetailsComponent,
    ConfirmComponent,
    BarometerComponent,
    IndicatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    DateValueAccessorModule
  ],
  providers: [ {provide: LOCALE_ID, useValue: 'da-DK'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
