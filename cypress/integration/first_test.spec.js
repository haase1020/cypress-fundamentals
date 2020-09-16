/// <reference types="cypress" />

//to use env variables
alert(Cypress.env('MY_LOGIN'));
alert(Cypress.env('MY_PASSWORD'));

import { navigate } from '../page-objects/todo-page';

describe('Heading text', () => {
  beforeEach(() => {
    navigate();
  });

  it('containes the correct title', () => {
    cy.get('h1').invoke('text').should('equal', 'todos');
  });
});

it();
