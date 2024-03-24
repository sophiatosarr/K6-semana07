describe("FormularioPage Tests", () => {
    beforeEach(() => { 
      cy.visit("/formulario");
    });
  
    it('should display the label of name', () => {
      cy.get(':nth-child(1) > .block').should(
        'contain', 'Nome do Widget');
    });
    
    it('should display the input with correct properties', () => {
        cy.get('#name').should(
        'have.attr', 'placeholder', 'Ex: Pesquisa de Satisfação');
    });

    it('should display the label of link', () => {
        cy.get('form > :nth-child(2)').should(
        'contain', 'Link do Widget', 'contain', 'placeholder', 'Ex: https://forms.gle/123456');
      });
     
    it('should display the label and input with correct properties', () => {
        cy.get('form > :nth-child(3)').should(
        'contain', 'Pergunta para o usuário',  'contain', 'placeholder', 'Ex: Qual sua opinião sobre o produto?');
    });
      
});
    

  