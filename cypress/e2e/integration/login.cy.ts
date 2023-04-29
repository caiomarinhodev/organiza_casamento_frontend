describe("Login", () => {
  it("should login successfully", () => {
    cy.visit("/login");
    cy.get("#username").type("caio");
    cy.get("#password").type("oficinag3");
    cy.get("#login-btn").click();
    cy.url().should("include", "/");
  });
});
