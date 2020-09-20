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

    let date = new Date();
    date.setDate(date.getDate() + 2);
    let futureDay = date.getDate();
    let futureMonth = date.toLocalString('default', { month: 'short' });
    let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear();

    cy.get('nb-calendar-navigation')
      .invoke('attr', 'ng-reflect-date')
      .then((dateAttribute) => {
        if (dateAttribute.includes(futureMonth)) {
          cy.get('[data-name="chevron-right"]').click();
        } else {
          cy.get('nb-calendar-day-picker').contains(futureDay).click();
        }
      });

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

  //dropdown
  it.only('list and dropdowns', () => {
    cy.visit('/');

    //1
    cy.get('nav nb-select').click();
    cy.get('.options-list').contains('Dark').click();

    //cypress only uses rgb format
    cy.get('nb-layout-header nav').should(
      'have.css',
      'background-color',
      'rgb(34, 43, 69)'
    );

    //2
    cy.get('nav nb-select').then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get('.options-list nb-options').each((listItem) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: 'rgb(255, 255, 255',
          Dark: 'rgb(34,43,69)',
          Cosmic: 'rgb(50,50,89)',
        };
        cy.wrap(listItem).click();
        cy.wrap(dropdown).should('contain', itemText);
        cy.get('nb-layout-header nav').should(
          'have.css',
          'background-color',
          colors[itemText]
        );
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it.only('Web tables', () => {
    cy.visit('/');
    cy.contains('Tables & data').click();
    cy.contains('Smart Table').click();

    //1
    cy.get('tbody')
      .contains('tr', 'Larry')
      .then((tableRow) => {
        cy.wrap(tableRow).find('find').find('.nb-edit').click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
        cy.wrap(tableRow).find('.nb-checkmark').click();
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
      });

    //2
    cy.get('thead').find('.nb-plus').click();
    cy.get('thead')
      .find('tr')
      .eq(2)
      .then((tabelRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem');
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar');
        cy.wrap(tableRow).find('.nb-checkmark').click();
      });
    cy.get('tbody tr')
      .first()
      .find('td')
      .then((tableColums) => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Artem');
        cy.wrap(tableColums).eq(3).should('contain', 'Bondar');
      });

    //3
    const age = [20, 30, 40, 200];
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(200);
      cy.get('table tr').each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should('contain', 'No data found');
        } else {
          cy.wrap(tableRow).find('td').eq(5).should('contain', age);
        }
      });
    });
  });
});
