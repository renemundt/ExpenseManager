import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {

  private temperature = 'NORMAL'

  constructor() { }

  ngOnInit() {
  }

}
