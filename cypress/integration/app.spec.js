/// <reference types="cypress" />

const { wait } = require("@testing-library/react");

describe("e2e", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("should render table, searchInput, buttons", () => {
    cy.get("[data-cy=searchField]").should("exist");
    cy.get("[data-cy=bookBtn]").should("exist");
    cy.get("[data-cy=returnBtn]").should("exist");

    cy.get("[data-cy=tableContainer]").should("exist");
    cy.get("[data-cy=tableHead]").should("exist").should("have.length", 7);
    cy.get("[data-cy=tableRow]").should("exist").should("have.length", 17);
  });

  describe("search table", () => {
    beforeEach(() => {
      cy.get("[data-cy=searchField").should("exist");
    });

    it("type and search", () => {
      cy.get("[data-cy=searchField]").focus();
      cy.get("[data-cy=searchField]").type("dia").should("have.value", "dia");
      cy.get("[data-cy=tableRow]").should("exist").should("have.length", 1);
    });
  });

  describe("Book product", () => {
    beforeEach(() => {
      cy.get("[data-cy=bookBtn]").click();
      cy.get("[data-cy=bookModal").should("exist");
    });

    it("should exist modal elements", () => {
      cy.get("[data-cy=bookModal]").should("exist");
    });

    it("should render all product names", () => {
      cy.get("[data-cy=productSelector]").click();
      cy.get("[data-cy='list-item']").should("have.length", 17);
    });

    it("action button shoould not be visible", () => {
      cy.get("[data-cy=yesBtn]").should("not.exist");
    });

    describe("test first product booking", () => {
      beforeEach(() => {
        // open menu
        cy.get("[data-cy=productSelector]").click();
      });

      it("select first product and proceed", () => {
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
    });

    describe("4th item should be unavailabe", () => {
      it("fail to book 4th product", () => {
        cy.get("[data-cy=productSelector]").click();
        cy.get("[data-cy=list-item]")
          .eq(3)
          .click()
          .and("contain", "Copper Blade 5 inch");

        cy.get(
          ".css-vhasys > :nth-child(1) > .MuiOutlinedInput-root > .MuiOutlinedInput-input"
        ).should("be.disabled"); // from data

        cy.get("[data-cy=product-unavailable-text]")
          .should("exist")
          .and("contain.text", "This product is currently not availabe");
      });
    });
  });
});
