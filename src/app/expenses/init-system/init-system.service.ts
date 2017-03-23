import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class InitSystemService {

  private initMessage = new InitMessage();

  constructor(private http: Http) { }

  public intializeCouchDb(): Observable<InitMessage> {
    return Observable.create(observer => {
      this.http.put(environment.url, JSON.stringify(environment.databaseName), { headers: environment.headers })
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
