/// <reference types="cypress" />

//from linkedin course// results version of aliasing.spec.js

//max chars is 15
describe('Text box with max chars', () => {
  it('displays the appropriate remaining char count', () => {
    cy.visit('http://localhost:3000/example-2');

    cy.get('[data-cy="last-name-chars-left-count]').as('charsLeftSpan');

    //using results with alias
    cy.get('@charsLeftSpan').then(($charsLeftSpan) => {
      expect($charsLeftSpan.text()).to.equal('15');
    });
    // cy.get('@charsLeftSpan').invoke('text').should('equal', '15');

    cy.get('input').type('hello');

    cy.get('@charsLeftSpan').invoke('text').should('equal', '10');

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
