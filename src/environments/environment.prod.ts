import { Headers } from '@angular/http'

export const environment = {
    production: true,
    url: 'https://expense-manager-backend.herokuapp.com/api/',
    thresholdLower: 300,
    thresholdLimit: 400,
    auth0: {
        clientID: 'V8Vq7mYp08JGKn5qDULusXPWHs7VfYz1',
        domain: 'renemundt.eu.auth0.com',
        audience: 'ExpenseManagerFrontends',
        redirectUri: 'https://expense-manager-frontend.herokuapp.com/callback',
    }
}
