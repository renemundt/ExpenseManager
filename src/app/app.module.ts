import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ExpensesComponent } from './expenses/expenses/expenses.component';
import { InitSystemComponent } from './expenses/init-system/init-system.component';

const ROUTES: Routes = [
  { path: '', component: InitSystemComponent },
  { path: 'expenses', component: ExpensesComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    InitSystemComponent
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
