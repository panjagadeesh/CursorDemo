// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to visit the application URL
 */
Cypress.Commands.add("visitGlobal", (envKey = "settings") => {
    const baseUrl = Cypress.env(envKey) || Cypress.config("baseUrl");
  
    cy.visit(`${baseUrl}/login`, { failOnStatusCode: false });
  
    // Handle unexpected errors globally
    cy.on("uncaught:exception", (err, runnable) => {
      return false; // Ignore known errors
    });
  });

// Custom command to clear browser data
Cypress.Commands.add('clearBrowserData', () => {
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
})

Cypress.Commands.add('adminmodule', (adminmodule) => {
    cy.wait(2000);
    cy.get('div > .ah-setting-card').contains(adminmodule).click()
})

/**
 * Custom command to handle dropdown selection
 * @param {string} fieldName - The label text of the dropdown
 * @param {string} selectname - The option to select from the dropdown
 */
Cypress.Commands.add('Dropdown', (fieldName, selectname) => {
    // Wait for the dropdown to be ready
    cy.wait(1000);
    
    // Find and click the dropdown using a more specific selector
    cy.contains('label em', fieldName)
        .parents('.form-group')
        .find('.dropdown')
        .should('be.visible')
        .click();

    // Select the option from the dropdown
    cy.contains('label em', fieldName)
        .parents('.form-group')
        .find('.dropdown.show li')
        .contains(selectname)
        .should('be.visible')
        .click();
});

/**
 * Custom command to navigate and select a date in a datepicker
 * @param {string} trimpastdays - 'yes' to navigate backwards, any other value to navigate forwards
 * @param {string} trimmonthday - The month to look for (e.g., 'january', 'february')
 * @param {string} date - The date to select
 */
Cypress.Commands.add('checkAndNavigate', (trimpastdays, trimmonthday, date) => {
    // Common XPath selectors
    const SELECTORS = {
        monthTitle: '//div[contains(@class,"datepicker-title")]/child::*',
        dateCell: '//div[contains(@class, "ui-datepicker-calendar")]//table//tr//td//a[not(contains(@class, "ui-state-disabled"))] | //div[contains(@class, "p-datepicker-calendar")]//table//tr//td/*[not(contains(@class, "p-disabled")) and not(self::a)]',
        prevIcon: '//span[contains(@class, "p-datepicker-prev-icon")] | //span[contains(@class, "ui-datepicker-prev-icon")]',
        nextIcon: '//span[contains(@class, "p-datepicker-next-icon")] | //span[contains(@class, "ui-datepicker-next-icon")]'
    };

    function navigateToMonth() {
        return cy.xpath(SELECTORS.monthTitle)
            .first()
            .invoke('text')
            .then((month) => {
                const currentMonth = month.trim().toLowerCase();
                cy.log('Current Month:', currentMonth);

                if (currentMonth.includes(trimmonthday)) {
                    // Found the correct month, now find and click the date
                    cy.xpath(SELECTORS.dateCell)
                        .each(($element) => {
                            cy.wrap($element)
                                .invoke('text')
                                .then((text) => {
                                    if (text.includes(date)) {
                                        cy.wrap($element).click();
                                        return false; // Break the each loop
                                    }
                                });
                        });
                } else {
                    // Navigate to next/previous month and try again
                    const navigationIcon = trimpastdays.includes('yes') ? SELECTORS.prevIcon : SELECTORS.nextIcon;
                    cy.xpath(navigationIcon).click();
                    navigateToMonth(); // Recursive call
                }
            });
    }

    // Start the navigation process
    cy.log(`Navigating to ${trimmonthday} ${date} (${trimpastdays.includes('yes') ? 'backwards' : 'forwards'})`);
    navigateToMonth();
});

/**
 * Custom command to navigate to attendance sub-screens
 * @param {string} Sub_Name - The name of the attendance sub-screen to navigate to
 */
Cypress.Commands.add('Attendance_Sub', (Sub_Name) => {
    cy.get('.ah-badge-set > button')
        .contains(Sub_Name)
        .click();
});

/**
 * Custom command to handle login for different user roles
 * @param {string} role - User role ('admin' or 'employee')
 * @param {string} username - Username or employee ID
 * @param {string} password - User password
 */
Cypress.Commands.add('loginDetails', (role, username, password) => {
    // Set viewport and initial wait
    cy.viewport(2000, 1080);
    cy.wait(1000);

    // Define login selectors based on role
    const loginSelectors = {
        admin: {
            usernameField: '#username',
            passwordField: '#password',
            loginButton: '.ah-login-action-set > .ah-btn'
        },
        employee: {
            usernameField: '#emp_id',
            passwordField: '#password',
            loginButton: '.ah-login-btn'
        }
    };

    // Validate role
    if (!loginSelectors[role]) {
        throw new Error(`Invalid role "${role}". Use 'admin' or 'employee'.`);
    }

    const selectors = loginSelectors[role];

    // Perform login
    cy.get(selectors.usernameField).type(username);
    cy.wait(1000);
    
    if (role === 'employee') {
        cy.get(selectors.passwordField).click();
    }
    
    cy.get(selectors.passwordField).type(password);
    cy.get(selectors.loginButton).click();

    // Wait for login to complete
    cy.wait(8000);
});
