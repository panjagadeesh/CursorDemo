# Cypress Automation Framework

This is a Cypress automation framework for testing the login functionality of the application.

## Features

- Page Object Model implementation
- Data-driven testing
- Mochawesome reporting
- Screenshot capture on failure
- Cross-browser testing support

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running Tests

1. Open Cypress Test Runner:
```bash
npm run cypress:open
```

2. Run tests in headless mode:
```bash
npm run cypress:run
```

3. Generate test report:
```bash
npm run test:report
```

## Project Structure

```
cypress/
├── e2e/                    # Test specs
├── fixtures/               # Test data
├── pages/                  # Page objects
├── support/               # Support files
└── reports/               # Test reports
```

## Test Data

Test data is stored in `cypress/fixtures/testData.json`. You can modify the test cases and credentials there.

## Reports

After running the tests, you can find the reports in the `cypress/reports` directory. 