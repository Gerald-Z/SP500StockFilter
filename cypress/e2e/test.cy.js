describe('Accessing the App', () => {
    beforeEach(function () {
        cy.loginByGoogleApi()
    })

    it('Access the app', () => {
      cy.visit('http://localhost:3000')
     // cy.contains('Sign In').click()
    })
  })