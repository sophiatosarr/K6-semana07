describe("formulario page tests", () => {
  beforeEach(() => {
    cy.visit("/formulario");
    cy.intercept("POST", "/widgets", {
      statusCode: 200,
    }).as("createWidget");
  });
  it("displays error messages for required fields", () => {
    cy.visit("/formulario");
    cy.get("form").submit();
    cy.get("#error-name").should("contain.text", "Campo obrigatório");
    cy.get("#error-link").should("contain.text", "Campo obrigatório");
    cy.get("#error-question").should("contain.text", "Campo obrigatório");
  });
  
  it("displays error message when the request fails", () => {
    cy.intercept("POST", "/widgets", {
      statusCode: 500,
      body: { message: "Erro ao cadastrar widget" },
    }).as("createWidgetFail");
    cy.get("#name").type("widget automatizado");
    cy.get("#link").type("www.inteli.edu.br");
    cy.get("#question").type("Você gostou do widget automatizado?");
    cy.get("form").submit();
    cy.wait("@createWidgetFail");
    cy.get(".Toastify__toast-body").should(
      "contain.text",
      "Erro ao cadastrar widget"
    );
  });
  it("submits the form successfully and navigates to the home page", () => {
    cy.get("#name").type("widget automatizado");
    cy.get("#link").type("www.inteli.edu.br");
    cy.get("#question").type("Você gostou do widget automatizado?");
    cy.get("form").submit();
    cy.wait("@createWidget");
    cy.get(".Toastify__toast-body").should(
      "contain.text",
      "Widget cadastrado com sucesso!"
    );
    cy.url().should("eq", "http://localhost:5173/");
  });
});
