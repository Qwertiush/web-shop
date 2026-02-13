describe('Navbar', () => {
  it('Goes through navbar functionality', () => {
    cy.visit('/')

    cy.getByTestId('nav-container').contains('Welcome');

    cy.getByTestId('theme-checkbox').click({ force: true });

    cy.getByTestId('nav-select-PC parts').select('RAM');

    cy.url().should('include', '/ram');

    cy.contains('RAM DDR5').first().click();

    cy.contains('Add to cart').click();

    cy.getByTestId('cart-button').should('contain', '1');

    cy.getByTestId('cart-button').click();

    cy.contains('RAM DDR5');

    cy.getByTestId('nav-search-bar').type('super{enter}').should('have.value', 'super');
  })
})