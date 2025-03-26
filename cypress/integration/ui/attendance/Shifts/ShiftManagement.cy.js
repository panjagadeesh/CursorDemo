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

                //xhbdsdhasdb

                
            });
        });
    });

    // Additional test cases can be added here
    // Example:
    // it('should validate shift creation with invalid data', () => {
    //     // Test invalid data scenarios
    // });
}); 