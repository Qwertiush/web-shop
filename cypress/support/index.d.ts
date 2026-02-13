/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to get element by data-testid
     * @example cy.getByTestId('cart-button')
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
  }
}
