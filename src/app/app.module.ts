import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { ExpensesComponent } from './expenses/expenses/expenses.component';
import { InitSystemComponent } from './expenses/init-system/init-system.component';
import { HeaderComponent } from './header/header.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { ExpenseDetailsComponent } from './expenses/expense-details/expense-details.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { BarometerComponent } from './expenses/barometer/barometer.component';
import { IndicatorComponent } from './expenses/indicator/indicator.component';
import { TemperatureService } from './shared/temperature.service';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthService } from './auth/auth.service'

const ROUTES: Routes = [
  // { path: '', component: InitSystemComponent }, admin credentials needed to create database on smileupss
  { path: '', component: AuthComponent },
  { path: 'create-expense', component: CreateExpenseComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expense-details/:id', component: ExpenseDetailsComponent },
  { path: 'barometer', component: BarometerComponent }
]

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

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
    IndicatorComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    DateValueAccessorModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'da-DK'},
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [ Http, RequestOptions ] },
    TemperatureService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
