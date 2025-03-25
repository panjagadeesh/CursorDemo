// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-xpath'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide XHR requests from command log
const app = window.top;
if (app) {
    app.console.log = () => {};
}

// Global before hook
beforeEach(() => {
    // Add any global setup here
    cy.clearBrowserData()
})

// Global after hook
afterEach(() => {
    // Add any global cleanup here
})

// Global after all hook
after(() => {
    // Add any final cleanup here
}) 