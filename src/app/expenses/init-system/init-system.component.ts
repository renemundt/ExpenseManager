import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { InitSystemService, InitMessage } from './init-system.service';

@Component({
  selector: 'app-init-system',
  templateUrl: './init-system.component.html',
  styleUrls: ['./init-system.component.css'],
  providers: [InitSystemService]
})
export class InitSystemComponent implements OnInit {

  private errorMessage: string;
  private systemInitialized: boolean;

  constructor(
    private router: Router,
    private initSystemService: InitSystemService
  ) { }

  ngOnInit(): void {
    this.initSystemService.intializeCouchDb().subscribe(data => {
      if (data.success === true) {
        this.router.navigate(['/expenses']);
        this.systemInitialized = true;
      } else {
        this.errorMessage = `CouchDb says: ${data.message}`;
      }
    });
  }
}
