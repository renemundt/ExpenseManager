import { Headers } from '@angular/http'

export const environment = {
  production: true,
  baseUrl: 'https://admin:645ead53cba1@couchdb-ffb027.smileupps.com/',
  url: 'https://admin:645ead53cba1@couchdb-ffb027.smileupps.com/expensemanager',
  databaseName: 'expensemanager',
  headers: new Headers({'Content-Type': 'application/json'}),
  thresholdLower: 250,
  thresholdLimit: 300

}
