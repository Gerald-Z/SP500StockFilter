
describe("Updates the stock data", () => {
  const list1 = ['GS', 'GOOGL', 'META', 'JPM', 'AMZN', 'MSFT', 
        'NFLX', 'TSLA', 'IBM', 'AAPL', 'NVDA']; 
  const list2 = ['LLY', 'AVGO', 'XOM',
        'UNH', 'V', 'HD', 'MA', 'PG', 'JNJ', 'MRK'];

  it("Loads a stock data into MongoDB", () => {
    cy.visit("http://localhost:3000");
    list2.map((item) => {
        cy.request("POST", `api/data/populateDB?symbol=${item}`).as("response");
        cy.get("@response").should((response) => {
          expect(response.status).to.eq(200);
        //  expect(response.body.username).to.equal(testUsername);
        });
    })

  });
});


