# Customer Funnel

> Gathering customer information i.e. personal and loan details

To see it running visit the [dev site](https://customer-funnel.fly.dev/)

### Getting Started

The project is using [vite](https://vite.dev/guide/) for building a client-side react using typscript.

```bash
$ node --version # should be v22+
$ npm install # install dependencies
```

To run the customer funnel:

```bash
$ npm run dev
```

Open http://localhost:5173 with your browser to see the result.

# Testing

## Unit tests

Application is using Jest and React testing library for testing react components.

```bash
$ npm run test
```

Also, application also use the following:

- [nock](https://github.com/nock/nock) for mocking API calls.

## Functionality tests

Application is using [Cypress](https://www.cypress.io/) to validate functionality, To run the tests, simply run:

```
$ npm run cypress:open # to open cypress browser.
$ npm run cypress:headless # to run all tests in headless mode.
```

> [!NOTE]
> The endpoints being used in the cypress run is on a different service.
