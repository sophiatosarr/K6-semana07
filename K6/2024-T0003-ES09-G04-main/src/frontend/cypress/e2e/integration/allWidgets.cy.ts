
describe("AllWidgetsPage Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:5244/widgets", {
      fixture: "widgets.json",
    }).as("fetchWidgets");
    cy.visit("/");
  });

  it("should display loading", () => {
    cy.intercept("GET", "http://localhost:5244/widgets", {
      delay: 700,
      fixture: "widgets.json",
    }).as("fetchWidgetsDelay");
    cy.visit("/");
    cy.get("#loading").should(
      "contain.text",
      "Carregando..."
    );
  });

  it("should display widgets after loading", () => {
    cy.wait("@fetchWidgets");
    cy.get("#widgets").should("have.length.greaterThan", 0);
  });

  it("should display a widget with the correct name", () => {
    cy.wait("@fetchWidgets");
    cy.get("#widgets").should("contain.text", "Widget 1");
  });

  it("should display error", () => {
    cy.visit("/");
    cy.intercept("GET", "http://localhost:5244/widgets", {
      statusCode: 500,
      delay: 5000,
    }).as("fetchWidgetsFail");
    cy.wait("@fetchWidgetsFail");
    cy.wait(2500);
    cy.get("#widgets").should("contain.text", "Erro ao carregar widgets");
  });
  it("should navigate to new widget form", () => {
    cy.visit("/");
    cy.get("#buttonNew").click(); 
    cy.url().should("include", "/formulario"); 
    cy.get("#novo-widget").should("contain.text","Novo Widget");
  });
});
