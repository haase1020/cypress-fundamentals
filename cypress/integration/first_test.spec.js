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

    cy.contains('nb-card', 'basic form')
      .find('nb-checkbox')
      .click()
      .find('.custm-checkbox')
      .invoke('attr', 'class')
      // .should('contain', 'checked')
      .then((classValue) => {
        expect(classValue).to.contain('checked');
      });
  });

  //invoke!!
  it.only('assert property', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Forms Layouts').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then((input) => {
        //because is now JQUERY element use wrap
        cy.wrap(input).click();
        cy.get('nb-calendar-day-picker').contains('17').click();
        cy.wrap(input)
          .invoke('prop', 'value')
          .should('contain', 'Dec 19, 2019');
      });
  });

  it.only('radio button', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Forms Layouts').click();

    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should('be.checked');

        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should('not.be.checked');

        cy.wrap(radioButtons).eq(2).should('be.disabled');
      });
  });

  it.only('check boxes', () => {
    cy.visit('/');
    cy.contains('Modals & Overlays').click();
    cy.contains('Toaster').click();

    // cy.get('[type="checkbox"]').check({force:true})
    cy.get('[type="checkbox"]').eq(0).click({ force: true }); //to uncheck
    cy.get('[type="checkbox"]').eq(0).check({ force: true }); //for checkbox, can't uncheck
  });
});
