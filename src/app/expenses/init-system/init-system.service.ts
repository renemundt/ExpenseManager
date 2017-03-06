import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class InitSystemService {

  private url = 'http://localhost:5984/';
  private databaseName = 'expensemanager';
  private baseUrl = `${this.url}${this.databaseName}`;
  private initMessage = new InitMessage();

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  public intializeCouchDb(): Observable<InitMessage> {
    return Observable.create(observer => {
      this.http.put(this.baseUrl, JSON.stringify(this.databaseName), { headers: this.headers })
        .map((response: Response) => response.json())
        .subscribe(result => {
            this.initMessage.message = 'System was initialized';
            this.initMessage.success = true;
            observer.next(this.initMessage);
            observer.complete();
          }, error => {
            const errorSpecifics = error.json();
            if (error.status === 412) {
              if (errorSpecifics.error === 'file_exists') {
                this.initMessage.message = errorSpecifics.reason;
                this.initMessage.success = true;
                observer.next(this.initMessage);
                observer.complete();
                return;
              }
            }
            this.initMessage.message = `Unknown error - ${errorSpecifics.error}`;
            this.initMessage.success = false;
            console.error('Expense Manager error', error);
            observer.next(this.initMessage);
            observer.complete();
          }
        );
    });
  }
}

export class InitMessage {
  public success: boolean;
  public message: string;
}
