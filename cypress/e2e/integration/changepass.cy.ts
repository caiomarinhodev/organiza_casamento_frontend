describe("ChangePass", () => {
  it("should change password successfully", () => {
    cy.visit("/change-password");
    cy.get("#password").type("oldpassword");
    cy.get("#retype_password").type("newpassword");
    //checkif exists btn
    cy.get("#change-pass-btn").should('be.visible');
    cy.get("#back_btn").should('be.visible');
  });
});
