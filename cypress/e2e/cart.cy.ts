describe('Cart', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.getByTestId('nav-select-PC parts').select('Graphics Card')
    cy.location('pathname').should('eq', '/gpu') 
  });

  it('Adds product from the list to the cart', () => {
    cy.getByTestId('add-to-cart-item').first().click();
    cy.getByTestId('cart-button').should('contain', '1');
  });

  it('Adds product from the product page to the cart', () => {
    cy.getByTestId('product-card').first().click();
    cy.getByTestId('add-to-cart').click();
    cy.getByTestId('cart-button').should('contain', '1');
  });

  it('Increment number of individual item in the cart', () => {
    cy.getByTestId('add-to-cart-item').first().click();
    cy.getByTestId('cart-button').click();
    cy.getByTestId('cart-increment-product').first().click();
    cy.getByTestId('cart-product-quantity').contains('2');
  });

  it('Decrement number of individual item in the cart', () => {
    cy.getByTestId('add-to-cart-item').first().click();
    cy.getByTestId('cart-button').click();
    cy.getByTestId('cart-decrement-product').first().click();
    cy.contains('cart is empty');
  });

  it('Removes item from the cart', () => {
    cy.getByTestId('add-to-cart-item').first().click();
    cy.getByTestId('cart-button').click();
    cy.getByTestId('cart-remove-product').first().click();
    cy.contains('cart is empty');
  });
});
