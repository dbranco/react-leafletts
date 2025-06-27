describe("<Popup /> E2E test page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/test/e2e/test-app/index.html");
  });

  it("opens popup on marker click and shows content", () => {
    cy.get("[data-testid='open-popup']").click();
    cy.get("[data-testid='popup-content']")
      .should("exist")
      .and("contain.text", "Hello from popup");
  });
});
