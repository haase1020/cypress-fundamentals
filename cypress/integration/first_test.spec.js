/// <reference types="cypress" />

//to use env variables
alert(Cypress.env('MY_LOGIN'));
alert(Cypress.env('MY_PASSWORD'));

import { navigate } from '../page-objects/todo-page';

describe('Heading text', () => {
  beforeEach(() => {
    navigate();
  });

  it('contains the correct title', () => {
    cy.get('h1').invoke('text').should('equal', 'todos');
  });
  it.only('then and wrap methods', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Forms Layouts').click();

    cy.contains('nb-card', 'using the Grid')
      .find('[for="inputEmail1"]')
      .should('contain', 'Email');

    cy.contains('nb-card', 'using the Grid')
      .find('[for="inputEmail1"]')
      .should('contain', Password);

    cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
      // this is JQuery format so can save as a constant
      const emailLabelFirst = firstForm.find('[for=inputEmail1]').text();
      expect(emailLabelFirst).to.equal('Email');
    });
  });

  it.only('invoke command', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Forms Layouts').click();

    //1
    cy.get('[for="inputEmail1"]').should('contain', 'Email address');
    //2
    cy.get('[for="inputEmail1"]').then((label) => {
      expect(label.text()).to.equal('Email address');
    });
    //3
    cy.get('[for="inputEmail1"]')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Email address');
      });
  });
});
