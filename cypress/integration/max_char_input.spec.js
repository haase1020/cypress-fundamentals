/// <reference types="cypress" />

const { eq } = require('cypress/types/lodash');

//from linkedin course
//max chars is 15
describe('Text box with max chars', () => {
  it('displays the appropriate remaining char count', () => {
    cy.visit('http://localhost:3000/example-2');
    //eq is if you have more than one item
    cy.get('[data-cy="last-name-chars-left-count]')
      .invoke('text')
      .should('equal', '15');

    cy.get('input').type('hello');

    cy.get('[data-cy="last-name-chars-left-count]')
      .invoke('text')
      .should('equal', '10');

    cy.get('input').eq(1).type(' my friend');
    cy.get('[data-cy="last-name-chars-left-count]')
      .invoke('text')
      .should('equal', '0');
  });

  it('prevents user from typing over 15 chars', () => {
    cy.visit('http://localhost:3000/example-2');

    cy.get('input').eq(1).type('abcdefghijklmnopqurstuvwxyz');
    cy.get('input').eq(1).should('have.attr', 'value', 'abcdefghijklmno');
  });
});
