/// <reference types="cypress" />

import { navigate } from '../page-objects/todo-page';

describe('Heading text', () => {
  beforeEach(() => {
    navigate();
  });

  it('containes the correct title', () => {
    cy.get('h1').invoke('text').should('equal', 'todos');
  });
});
