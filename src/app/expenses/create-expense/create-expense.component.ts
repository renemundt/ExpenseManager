import { Component, OnInit } from '@angular/core';
import { Expense } from './../expense.models';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  private timestamp: any;

  expense = new Expense();

  constructor() { }

  ngOnInit() {
    const now = new Date();
    this.expense.timestamp = new Date(now.getTime());
  }

  private parseDateToStringWithFormat(date: Date): string {
    let result: string;
    let dd = date.getDate().toString();
    let mm = (date.getMonth() + 1).toString();
    dd = dd.length === 2 ? dd : '0' + dd;
    mm = mm.length === 2 ? mm : '0' + mm;

    result = [date.getFullYear(), '-', mm, '-', dd].join('');

    return result;
  }

  public set dateTimeLocal(v: string) {
    const actualParsedDate = v ? new Date(v) : new Date();
    const normalizedParsedDate = new Date(actualParsedDate.getTime() + (actualParsedDate.getTimezoneOffset() * 60000));
    this.expense.timestamp = normalizedParsedDate;
  }


  public get dateTimeLocal(): string {
    return this.parseDateToStringWithFormat(this.expense.timestamp);
  }
}


