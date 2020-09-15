# notes from Test Automation University

- cypress is chrome only
- uses mocha
  -fast: test code runs in browser

`npm install cypress --save-dev`

then first time you run after installing cypress:
`npx cypress open`

use this website for tests:
`http://todomvc-app-for-testing.surge.sh/`

to run cypress non-interactively: (CI environment)
`npx cypress run` (this runs tests in headless mode)

`npx cypress run --help` (for help options)
`npx cypress run --spec <spec>`

for others that download code:
`npm install`

to run tests:

`npm test` (headless mode/ non-interactive)
`npm run cypress`(for interactive)
