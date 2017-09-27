export class Expense {
    public id: string
    public amount: number
    public store: string
    public created: Date
    public updated: Date
    public timeOfPurchase: Date
    public profile: Profile

    constructor() {
        const profileFromStorage = JSON.parse(localStorage.getItem('profile'))
        const profile  = new Profile(profileFromStorage.user_id, profileFromStorage.given_name)
        this.profile = profile
    }
}

export class Profile {
    public id: string
    public givenName: string

    constructor(id: string, givenName: string) {
        this.id = id
        this.givenName = givenName
    }
}

export class BarometerExpense {
    public totalAmount: number
    public timestamp: Date
    public monthToDayAmount: number
    public average: number
}
