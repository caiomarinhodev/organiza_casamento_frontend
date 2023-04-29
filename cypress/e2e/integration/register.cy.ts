describe("Register", () => {
  it("should register successfully", () => {
    cy.visit("/register");
    cy.get("#username").type(`custom_user_${Math.floor(Math.random() * 5000000) + 1}`);
    cy.get("#email").type("user@example.com");
    cy.get("#password").type("Admin123!");
    cy.get("#retype_password").type("Admin123!");
    cy.get("#register-btn").click();
    cy.url().should("include", "/login");
  });
});
