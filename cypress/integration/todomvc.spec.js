///<reference types="cypress" />

//cypress uses mocha
it('should navigate to the TodoMVC app', () => {
  cy.visit('http://todomvc-app-for-testing.surge.sh/');
});
