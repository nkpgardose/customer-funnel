# Customer Funnel

> Gathering customer information i.e. personal and loan details

To see it running visit the [dev site](https://customer-funnel.fly.dev/)

### Getting Started

The project is using [vite](https://vite.dev/guide/) for building a client-side react using typscript.

```bash
$ node --version # should be v22+
$ npm install # install dependencies
```
Copy the `.env.example` file to `.env.local` and `.env.test.local` to use appropriate environment variables to your local.

To run the customer funnel:

```bash
$ npm run dev
```

Open http://localhost:5173 with your browser to see the result.

To run the customer funnel without the server: simply update the `VITE_API_BASE_URL` in the `.env.local` file to point to the API server https://customer-server.fly.dev/api/v1

When running the server locally, please make sure that API server is running locally as well.


# Testing

## Unit tests

Application is using vitest for testing react components.

```bash
$ npm run test
```
## end to end tests

Application is using [Cypress](https://www.cypress.io/) to validate functionality and end to end tests, To run the tests, simply run:

```
$ npm run dev # to start the server.
$ npm run cypress:open # to open cypress browser.
$ npm run cypress:headless # to run all tests in headless mode.
```
