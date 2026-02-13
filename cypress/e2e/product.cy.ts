describe('Product Page', () => {

  it('wyświetla produkty i można wejść w szczegóły', () => {
    cy.visit('/');
    cy.getByTestId('nav-select-PC parts').select('RAM')
    cy.getByTestId('product-card').first().click();
    cy.location('pathname').should('include', '/product/');
    cy.getByTestId('add-to-cart').should('be.visible');
  });
});
