describe("AllWidgetsPage Tests", () => {
    beforeEach(() => { 
      cy.visit("/");
    });

    it ('should do that', () => {
       cy.visit('/')
       cy.get('p.ml-2').should(
        'contains.text', 
       'Aqui você encontra os widgets criados pelo sistema')
      });

      it ('should click the button', () => {
        cy.visit('/')
        cy.get('#buttonNew').click()
       });
      
});


