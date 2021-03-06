/// <reference types="cypress" />

//from linkedin course// alias version of max_char_input.spec.js

//max chars is 15
describe('Text box with max chars', () => {
  beforeEach(() => {
    cy.visit('/example-2');

    cy.get('[data-cy="last-name-chars-left-count]').as('charsLeftSpan');
  });
  it('displays the appropriate remaining char count', () => {
    //eq is if you have more than one item
    cy.get('@charsLeftSpan').invoke('text').should('equal', '15');

    cy.get('input').type('hello');

    cy.get('@charsLeftSpan').invoke('text').should('equal', '10');

    cy.get('input').eq(1).type(' my friend');
    cy.get('[data-cy="last-name-chars-left-count]')
      .invoke('text')
      .should('equal', '0');
  });

  it('prevents user from typing over 15 chars', () => {
    cy.get('input').eq(1).type('abcdefghijklmnopqurstuvwxyz');
    cy.get('input').eq(1).should('have.attr', 'value', 'abcdefghijklmno');
  });
});
