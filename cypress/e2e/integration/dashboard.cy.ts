describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#username").type("caio");
    cy.get("#password").type("oficinag3");
    cy.get("#login-btn").click();
    cy.url().should("include", "/");
  });

  it("should display the welcome message", () => {
    cy.contains("Painel");
  });

  it("should navigate to the profile page", () => {
    cy.contains("Profile")
  });

  it("should navigate to the settings page", () => {
    cy.contains("Settings")
  });

  // it("should log out successfully", () => {
  //   cy.contains("Logout").click();
  //   cy.url().should("include", "/login");
  // });
});
