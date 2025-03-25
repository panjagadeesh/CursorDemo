class LoginPage {
    // Selectors
    elements = {
        usernameInput: () => cy.get('input[name="username"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        loginButton: () => cy.get('.ah-login-action-set button'),
        errorMessage: () => cy.get('.is-error-note')
    }

    // Actions
    visit() {
        cy.visit('/')
        cy.wait(2000) // Wait for page to load
    }

    enterUsername(username) {
        if (username) {
            this.elements.usernameInput().should('be.visible').clear().type(username)
        }
    }

    enterPassword(password) {
        if (password) {
            this.elements.passwordInput().should('be.visible').clear().type(password)
        }
    }

    clickLoginButton() {
        this.elements.loginButton().should('be.visible').click()
    }

    // Business Logic
    login(username, password) {
        this.visit()
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickLoginButton()
        // Wait for response
        cy.wait(2000)
    }

    // Verifications
    verifySuccessfulLogin() {
        cy.url().should('not.include', '/login')
    }

    verifyErrorMessage(expectedMessage) {
        this.elements.errorMessage()
            .should('be.visible')
            .and('contain', expectedMessage)
    }
}

export default LoginPage 