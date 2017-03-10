import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class SharedService {

  public static baseUrl = 'http://localhost:5984/expensemanager';
  public static databaseName = 'expensemanager';
  public static headers = new Headers({'Content-Type': 'application/json'});

  constructor() { }

}
