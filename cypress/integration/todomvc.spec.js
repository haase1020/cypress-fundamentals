///<reference types="cypress" />

//cypress uses mocha
it('should be able to add a new todo to the list', () => {
  cy.visit('http://todomvc-app-for-testing.surge.sh/');

  // add a timeout
  cy.get('.new-todo', { timeout: 6000 }).type('clean room{enter}');
  // validation
  cy.get('label').should('have.text', 'clean room');
  cy.get('.toggle').should('not.be.checked');

  cy.get('.toggle').click();
  cy.get('label').should('have.css', 'text-decoration-line', 'line-through');

  cy.contains('Clear').click();

  cy.get('.todo-list').should('not.have.descendants', 'li');
});
