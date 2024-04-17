const testEmail = Cypress.env('testing_email');
const testUsername = Cypress.env('testing_username');

describe("Retreives user info test", () => {
  it("There exists a user", () => {
    cy.visit("http://localhost:3000");
    cy.request("GET", `api/users/getUserInfo?user=` + testEmail).as("response");
    cy.get("@response").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.username).to.equal(testUsername);
    });
  });
});


describe("Retreives watchlist info test", () => {
  it("There exists a watchlist", () => {
    cy.visit("http://localhost:3000");
    cy.request("GET", `api/watchlist/getWatchlist?user=` + testEmail).as("response");
    cy.get("@response").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.tickerList).to.have.length(2);
    });
  });
});