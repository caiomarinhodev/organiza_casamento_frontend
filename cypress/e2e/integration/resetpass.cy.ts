describe("ResetPass", () => {
  it("should reset password successfully", () => {
    cy.visit("/reset-password");
    cy.get("#email").type("user@example.com");
    cy.get("#reset-btn").should('be.visible');
    cy.get("#back_btn").should('be.visible');
  });
});
