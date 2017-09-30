import { Headers } from '@angular/http'

export const environment = {
  production: true,
  url: 'https://expense-manager-backend.herokuapp.com/api/', // NEW BACKEND
  databaseName: 'expensemanager',
  headers: new Headers({'Content-Type': 'application/json'}),
  thresholdLower: 250,
  thresholdLimit: 300
}
