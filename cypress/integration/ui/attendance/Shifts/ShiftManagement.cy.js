import ShiftPage from "../../../../pages/ui/attendance/Shifts/AddShiftPage";

describe('Shift Management', () => {
    const shiftPage = new ShiftPage();
    const TEST_DATA = {
        pastdays: "yes",
        monthday: "jan",
        date: "16"
    };

    beforeEach(() => {
        // Set default command timeout
        Cypress.config('defaultCommandTimeout', 10000);

        // Visit and login
        cy.visitGlobal();
        cy.loginDetails("admin", "cadmin", "Master@1234");

        // Navigate to Shifts page
        cy.adminmodule("Attendance Settings");
        cy.Attendance_Sub("Shifts");
    });

    it('should successfully add a new shift with sessions', () => {
        // Load test data
        cy.fixture("ui/AddShift.json").then((data) => {
            if (!data || !data.length) {
                throw new Error('Test data is empty or invalid');
            }

            // Add new shift
            shiftPage.clickAddShift();
            shiftPage.fillShiftDetails(data[0]);

            // Navigate to specific date
            const { pastdays, monthday, date } = TEST_DATA;
            const trimpastdays = pastdays.trim().toLowerCase();
            const trimmonthday = monthday.trim().toLowerCase();

            // Handle date navigation and session creation
            cy.checkAndNavigate(trimpastdays, trimmonthday, date).then(() => {
                // Add and fill sessions after date navigation
                shiftPage.addAndFillSessions(data);
                shiftPage.handleSingleShift(data);
                cy.wait(10000);
                cy.get('div.modal-footer button.ah-btn').click()
                cy.get('div.ah-access-content > div.ah-access-info:nth-child(2)')
                    .should('be.visible')
                    .and('contain.text', 'Shift has been added successfully!');
                cy.get('button#request-close').click()

            });
        });
    });

    it('should perform actions on the newly created shift', () => {
        const SHIFT_CODE = '10AM_TO_6PM_1';
        
        // Test View Details action
        cy.handleShiftAction(SHIFT_CODE, 'View Details');
        cy.wait(2000); // Wait for details to load
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-header button.close').click();
        
        // Test View History action
        cy.handleShiftAction(SHIFT_CODE, 'View History');
        cy.wait(2000); // Wait for history to load
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-header button.close').click();
        
        // Test Update action
        cy.handleShiftAction(SHIFT_CODE, 'Update');
        cy.wait(2000); // Wait for update form to load
        cy.get('form').should('be.visible');
    });

    // Additional test cases can be added here
    // Example:
    // it('should validate shift creation with invalid data', () => {
    //     // Test invalid data scenarios
    // });
}); 