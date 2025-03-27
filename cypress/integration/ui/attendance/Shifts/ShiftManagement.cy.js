import ShiftPage from "../../../../pages/ui/attendance/Shifts/AddShiftPage";

describe('Shift Management', () => {
    const shiftPage = new ShiftPage();
    const TEST_DATA = {
        pastdays: "yes",
        monthday: "jan",
        date: "16"
    };

    it('should successfully add a new shift with sessions', () => {
        // Load test data
        Cypress.config('defaultCommandTimeout', 10000);

        // Visit and login
        cy.visitGlobal();
        cy.loginDetails("admin", "cadmin", "Master@1234");

        // Navigate to Shifts page
        cy.adminmodule("Attendance Settings");
        cy.Attendance_Sub("Shifts");

        cy.fixture("ui/AddShift.json").then((data) => {
            if (!data || !data.length) {
                throw new Error('Test data is empty or invalid');
            }

            // Add new shift
            shiftPage.clickAddShift();
            shiftPage.fillShiftDetails(data[0]);

            // Handle date navigation and session creation
            const { pastdays, monthday, date } = TEST_DATA;
            cy.checkAndNavigate(pastdays.trim().toLowerCase(), monthday.trim().toLowerCase(), date).then(() => {
                shiftPage.addAndFillSessions(data);
                shiftPage.handleSingleShift(data);

                cy.get('div.modal-footer button.ah-btn').click();

                cy.get('div.ah-access-content > div.ah-access-info:nth-child(2)')
                    .should('be.visible')
                    .and('contain.text', 'Shift has been added successfully!');

                cy.get('button#request-close').click();
            });
        });
    });

    it('should view details of the created shift', () => {
        const SHIFT_CODE = '10AM_TO_6PM_1';

        // Visit and login
        cy.visitGlobal();
        cy.loginDetails("admin", "cadmin", "Master@1234");

        // Navigate to Shifts page
        cy.adminmodule("Attendance Settings");
        cy.Attendance_Sub("Shifts");

        cy.shiftTableAction(SHIFT_CODE, 'View Details');

        cy.get('div.close-action')
            .should('be.visible')
            .first()
            .click();
    });

    it('should view history of the created shift', () => {
        const SHIFT_CODE = '10AM_TO_6PM_1';

        // Visit and login
        cy.visitGlobal();
        cy.loginDetails("admin", "cadmin", "Master@1234");

        // Navigate to Shifts page
        cy.adminmodule("Attendance Settings");
        cy.Attendance_Sub("Shifts");

        cy.shiftTableAction(SHIFT_CODE, 'View History');

        cy.get('div.ah-content-list-item')
            .should('be.visible')
            .first()
            .click();

            cy.get('div.close-action')
            .should('be.visible')
            .eq(1) // Selects the second element (0-based index)
            .click();
    });

    it('should update the created shift', () => {
        const SHIFT_CODE = '10AM_TO_6PM_1';

        // Visit and login
        cy.visitGlobal();
        cy.loginDetails("admin", "cadmin", "Master@1234");

        // Navigate to Shifts page
        cy.adminmodule("Attendance Settings");
        cy.Attendance_Sub("Shifts");

        cy.shiftTableAction(SHIFT_CODE, 'Update');

        cy.get('.ah-form-card-footer-right button.ah-btn').click();
    });
});
