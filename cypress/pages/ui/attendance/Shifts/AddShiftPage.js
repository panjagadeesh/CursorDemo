/**
 * Page Object Model for Add Shift functionality
 */
class AddShiftPage {
    // Locators
    elements = {
        // Main shift form elements
        addShiftButton: () => cy.get('.ah-btn-set > .ah-btn'),
        shiftNameInput: () => cy.get('.form-group-lg > #name'),
        shiftCodeInput: () => cy.get('#code'),
        fullDayHours: () => cy.get('[formcontrolname="fullDay_hrs"]'),
        fullDayMinutes: () => cy.get('[formcontrolname="fullDay_min"]'),
        halfDayHours: () => cy.get('[formcontrolname="halfDay_hrs"]'),
        halfDayMinutes: () => cy.get('[formcontrolname="halfDay_min"]'),
        basicCheckbox: () => cy.get('#basic'),
        
        // Session management elements
        addNewSessionButton: () => cy.get(":nth-child(4)> .ah-btn"),
        saveShiftButton: () => cy.get(':nth-child(1)> .ah-btn'),
        
        // Session row elements
        sessionRow: (index) => cy.get(`div.row.ng-untouched.ng-pristine.ng-invalid.ng-star-inserted:nth-of-type(${index + 1})`),
        sessionNameInput: '[placeholder="Enter Session Name"]',
        startTimeHours: '[formcontrolname="startTime"] [placeholder="HH"]',
        startTimeMinutes: '[formcontrolname="startTime"] [placeholder="MM"]',
        startTimePeriodButton: '[formcontrolname="startTime"] .period-control__button',
        endTimeHours: '[formcontrolname="endTime"] [placeholder="HH"]',
        endTimeMinutes: '[formcontrolname="endTime"] [placeholder="MM"]',
        endTimePeriodButton: '[formcontrolname="endTime"] .period-control__button',
        periodSelectorButtons: '.period-selector >li> .period-selector__button',
        inTimeGrace: '[placeholder="In Time Grace"]',
        outTimeGrace: '[placeholder="Out Time Grace"]'
    };

    /**
     * Click the Add Shift button
     */
    clickAddShift() {
        this.elements.addShiftButton().click();
    }

    /**
     * Fill in the basic shift details
     * @param {Object} items - Shift details object
     */
    fillShiftDetails(items) {
        const {
            Inputshift,
            Inputcode,
            MinHHFullday,
            MinMMFullday,
            MinHHhalfday,
            MinMMhalfday
        } = items;

        this.elements.shiftNameInput().type(Inputshift);
        this.elements.shiftCodeInput().type(Inputcode);
        this.elements.fullDayHours().type(MinHHFullday);
        this.elements.fullDayMinutes().type(MinMMFullday);
        this.elements.halfDayHours().type(MinHHhalfday);
        this.elements.halfDayMinutes().type(MinMMhalfday);
        this.elements.basicCheckbox().click();
    }

    /**
     * Click the Add New Session button
     */
    clickAddNewSession() {
        this.elements.addNewSessionButton().click();
    }

    /**
     * Click the Save Shift button
     */
    saveShift() {
        this.elements.saveShiftButton().click();
    }

    /**
     * Fill in session details for a specific row
     * @param {Object} $row - The session row element
     * @param {Object} sessionData - Session details object
     */
    fillSessionRow($row, sessionData) {
        const {
            sessionName,
            StartTimeHH,
            StartTimeMM,
            Start_Period_Selector,
            EndTimeHH,
            EndTimeMM,
            End_Period_Selector,
            In_Time_Grace,
            Out_Time_Grace
        } = sessionData;

        // Fill session name and times
        cy.wrap($row).find(this.elements.sessionNameInput).type(sessionName);
        cy.wrap($row).find(this.elements.startTimeHours).type(StartTimeHH);
        cy.wrap($row).find(this.elements.startTimeMinutes).type(StartTimeMM);
        cy.wrap($row).find(this.elements.startTimePeriodButton).click();

        // Select start period
        cy.wrap($row).find(this.elements.periodSelectorButtons)
            .contains(Start_Period_Selector)
            .click();

        // Fill end time
        cy.wrap($row).find(this.elements.endTimeHours).type(EndTimeHH);
        cy.wrap($row).find(this.elements.endTimeMinutes).type(EndTimeMM);
        cy.wrap($row).find(this.elements.endTimePeriodButton).click();

        // Select end period
        cy.wrap($row).find(this.elements.periodSelectorButtons)
            .contains(End_Period_Selector)
            .click();

        // Fill grace periods
        cy.wrap($row).find(this.elements.inTimeGrace).type(In_Time_Grace);
        cy.wrap($row).find(this.elements.outTimeGrace).type(Out_Time_Grace);
    }

    /**
     * Add and fill multiple sessions
     * @param {Array} items - Array of session details
     */
    addAndFillSessions(items) {
        items.forEach((item, index) => {
            this.elements.sessionRow(index)
                .should('exist')
                .then($row => this.fillSessionRow($row, item));

            if (index < items.length - 1) {
                this.clickAddNewSession();
            }
        });
    }

    /**
     * Handle saving shift based on number of sessions
     * @param {Array} items - Array of session details
     */
    handleSingleShift(items) {
        if (items.length > 1) {
            cy.Dropdown('Duration Calculated Method',"Duration between first in and last out time")
        }
        this.saveShift();
    }
}

export default AddShiftPage;