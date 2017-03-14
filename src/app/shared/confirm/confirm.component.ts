import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ConfirmEvent } from './confirm.models';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() id: string;
  @Input() rev: string;
  @Output() onConfirmed = new EventEmitter<ConfirmEvent>();

  constructor() { }

  ngOnInit() {
  }

  onYes() {
    this.onConfirmed.emit(new ConfirmEvent(this.id, this.rev));
  }

}
