
describe("Updates the stock data", () => {
  it("Loads a stock data into MongoDB", () => {
    cy.visit("http://localhost:3000");
    cy.request("POST", `api/data/populateDB?symbol=AAPL`).as("response");
    cy.get("@response").should((response) => {
      expect(response.status).to.eq(200);
    //  expect(response.body.username).to.equal(testUsername);
    });
  });
});


