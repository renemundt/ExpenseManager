export class Expense {
    public _id: string
    public _rev: string
    public amount: number
    public timestamp: Date
    public store: string
}

export class BarometerExpense {
    public totalAmount: number
    public timestamp: Date
    public monthToDayAmount: number
    public average: number
}