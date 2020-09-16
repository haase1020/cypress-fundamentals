/// <reference types="cypress" />

import * as todoPage from '../page-objects/todo-page';

describe('visual validation', () => {
  before(() => todoPage.navigate());

  beforeEach(() =>
    cy.eyesOpen({ appName: 'cypress-fundamentals', batchName: 'TodoMVC hey!' })
  );
  afterEach(() => cy.eyesClose());
  it('should look good', () => {
    cy.eyesCheckWindow('empty todo list');

    todoPage.addTodo('Clean room');
    todoPage.addTodo('Learn Cypress');

    cy.eyesCheckWindwo('two todos');
    todoPage.toggleTodo(0);

    cy.eyesCheckWindow('mark as completed');
  });
});
