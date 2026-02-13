describe('template spec', () => {

  it('Navigates to the gpu category', () => {
    cy.visit('/')
    cy.getByTestId('nav-select-PC parts').select('RAM')
    cy.location('pathname').should('eq', '/ram')
    cy.contains('RAM')
  })

  it('Navigates back to the Hero Page', () => {
    cy.visit('/ram')
    cy.getByTestId('nav-logo').click()
    cy.location('pathname').should('eq','/')
  })

})