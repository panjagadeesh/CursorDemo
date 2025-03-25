const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://settings-comics.akriviahcm.io',
    env: {
      settings: "https://settings-comics.akriviahcm.io",
      comics: "https://comics.akriviahcm.io",
      starwars: "https://starwars.akriviahcm.io/",
    },
    specPattern: 'cypress/integration/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mochawesome',
      mochawesomeReporterOptions: {
        reportDir: 'cypress/reports',
        overwrite: false,
        html: false,
        json: true,
        timestamp: 'mmddyyyy_HHMMss'
      }
    },
    // Additional settings for automated runs
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    retries: {
      runMode: 0,
      openMode: 0
    }
  }
}) 