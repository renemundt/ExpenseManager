// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { Headers } from '@angular/http'

export const environment = {
  production: false,
  url: 'http://localhost:8666/api/',
  thresholdLower: 300,
  thresholdLimit: 400
}
