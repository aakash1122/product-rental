// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("BookFirstItem", () => {
  cy.get("[data-cy=list-item]").first().click().and("contain", "12 GAS");
  // from date
  cy.get(
    ":nth-child(1) > .MuiOutlinedInput-root > .MuiInputAdornment-root > .MuiButtonBase-root"
  )
    .click()
    .then(() => {
      cy.contains("22").click();
    });
  cy.wait(200);
  // To date
  cy.get(
    ":nth-child(2) > .MuiOutlinedInput-root > .MuiInputAdornment-root > .MuiButtonBase-root"
  )
    .click()
    .then(() => {
      cy.contains("24").click();
    });

  cy.get("[data-cy=yesBtn]").should("exist").click();
  cy.get("[data-cy=finalYesBtn]").should("exist").click();
});
