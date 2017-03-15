import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ConfirmEvent } from './confirm.models';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

    @Input() dialogId: string;
    @Output() onConfirmed = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onYes() {
        this.onConfirmed.emit('emit');
    }

}
