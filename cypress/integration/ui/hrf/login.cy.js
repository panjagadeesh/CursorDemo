import LoginPage from '../../../pages/ui/hrf/LoginPage'

import testData from '../../../fixtures/ui/testData.json'

describe('Login Functionality', () => {
    const loginPage = new LoginPage()

    beforeEach(() => {
        // Handle uncaught exceptions
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            return false
        })
    })

    it('should login successfully with valid credentials', () => {
        const { username, password } = testData.validUser
        loginPage.login(username, password)
        loginPage.verifySuccessfulLogin()
    })

    // Test invalid login scenarios
    testData.invalidUsers.forEach((userData) => {
        it(`should show error message for invalid credentials: ${userData.username}`, () => {
            loginPage.login(userData.username, userData.password)
            loginPage.verifyErrorMessage(userData.errorMessage)
        })
    })

    // Test empty credentials
    it('should show error message for empty credentials', () => {
        const { username, password, errorMessage } = testData.emptyCredentials
        loginPage.login(username, password)
        loginPage.verifyErrorMessage(errorMessage)
    })
}) 