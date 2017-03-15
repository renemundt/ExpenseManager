import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

    @Input() date: Date;
    @Input() placeholder: string;
    @Input() disabled: boolean;

    constructor() { }

    ngOnInit() { }

    private parseDateToStringWithFormat(date: Date): string {
        let result: string;
        date = date instanceof Date ? date : new Date(date);
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
        this.date = normalizedParsedDate;
    }

    public get dateTimeLocal(): string {
        return this.parseDateToStringWithFormat(this.date);
    }

}
