// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { Headers } from '@angular/http'

export const environment = {
  production: false,
  baseUrl: 'http://localhost:5984/',
  url: 'http://localhost:5984/expensemanager',
  databaseName: 'expensemanager',
  headers: new Headers({'Content-Type': 'application/json'}),
  thresholdLower: 250,
  thresholdLimit: 300
  // production: true,
  // baseUrl: 'https://renemundt.cloudant.com/',
  // url: 'https://renemundt.cloudant.com/expensemanager',
  // databaseName: 'expensemanager',
  // headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ZWRpY2Fzc2lydGFuY2Vmb3VzdGlvcmRsOjU2MDY3MDIxMjQ2NDA3MWFkYTc4MTVjMjVjMzQwMWYxZjZiOWNjZWU='}),
  // thresholdLower: 250,
  // thresholdLimit: 300
}

// WORKING --> docker run --name mundt-couchdb -d -p 5984:5984 couchdb
// $ docker build -t expense-manager .
// $ docker run -p 8020:80 -d expense-manager