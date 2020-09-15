///<reference types="cypress" />

describe('filtering', () => {
  beforeEach(() => {
    cy.visit('http://todomvc-app-for-testing.surge.sh/');
    // add a timeout
    cy.get('.new-todo').type('clean room{enter}');
    cy.get('.new-todo').type('use JS{enter}');
    cy.get('.new-todo').type('learn Cypress{enter}');

    cy.get('.todo-list li:nth-child(2) .toggle').click();
  });

  it('should filter "active" todos', () => {
    cy.contains('Active').click();
    cy.get('.todo-list li').should('have.length', 2);
  });

  it('should filter "Completed" todos', () => {
    cy.contains('Completed').click();
    cy.get('.todo-list li').should('have.length', 1);
  });

  it('should filter "All" todos', () => {
    cy.contains('All').click();
    cy.get('.todo-list li').should('have.length', 3);
  });
});
