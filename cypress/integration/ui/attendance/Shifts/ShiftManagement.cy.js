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

    it('should view details of the created shift', () => {
        const SHIFT_CODE = '10AM_TO_6PM_1';
        cy.shiftTableAction(SHIFT_CODE, 'View Details');
        cy.wait(2000); // Add wait for modal to fully load
        cy.get('div.close-action')
            .should('be.visible')
            .first()
            .click();
    });

    it('should view history of the created shift', () => {
        const SHIFT_CODE = '10AM_TO_6PM_1';
        cy.shiftTableAction(SHIFT_CODE, 'View History');
        cy.wait(2000);
        cy.get('div.ah-content-list-item')
            .should('be.visible')
            .first()
            .click(); // Add wait for modal to fully load
        cy.get('div.close-action')
            .should('be.visible')
            .first()
            .click();
    });

    it('should update the created shift', () => {
        const SHIFT_CODE = '10AM_TO_6PM_1';
        cy.shiftTableAction(SHIFT_CODE, 'Update');
        cy.get('.ah-form-card-footer-right button.ah-btn').click()
    });
}); 