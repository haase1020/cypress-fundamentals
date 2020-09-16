/// <reference types="cypress" />

//from linkedin course
//max chars is 15
describe('Text box with max chars', () => {
  it('displays the appropriate remaining char count', () => {
    cy.visit('http://localhost:3000/example-2');

    cy.get('span').invoke('text').should('equal', '15');

    cy.get('input').type('hello');

    cy.get('span').invoke('text').should('equal', '10');

    cy.get('input').type(' my friend');
    cy.get('span').invoke('text').should('equal', '0');
  });

  it('prevents user from typing over 15 chars', () => {
    cy.visit('http://localhost:3000/example-2');

    cy.get('input').type('abcdefghijklmnopqurstuvwxyz');
    cy.get('input').should('have.attr', 'value', 'abcdefghijklmno');
  });
});
