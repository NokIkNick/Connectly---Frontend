/// <reference types="cypress" />

describe.only('Start visiting site', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:5173/home')
    })

    it('Modal popup', () => {
        cy.get('.sc-giBObj').click();
        //cy.get('div').contains('Modal Content').should('be.visible');
        cy.get('.sc-dprtRQ').type('Hello World');
        cy.get('.sc-eUlrpB').select('Family');
        cy.get('.sc-geXuza').click();
        // Waiting for connection with backend.

    })


})