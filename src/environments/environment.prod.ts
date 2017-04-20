import { Headers } from '@angular/http'

export const environment = {
  production: true,
  baseUrl: 'https://renemundt.cloudant.com/',
  url: 'https://renemundt.cloudant.com/expensemanager',
  databaseName: 'expensemanager',
  headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ZWRpY2Fzc2lydGFuY2Vmb3VzdGlvcmRsOjU2MDY3MDIxMjQ2NDA3MWFkYTc4MTVjMjVjMzQwMWYxZjZiOWNjZWU='}),
  thresholdLower: 250,
  thresholdLimit: 300
}
