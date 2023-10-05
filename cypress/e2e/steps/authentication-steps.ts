///<reference types="cypress"/>
///<reference types="cypress-iframe" />
import {Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

//in a Before step, set localStorage to confirm if we have closed the pop-up
Before(() => {
 
});

const relativeUrl =
  'extras/indybest/gadgets-tech/video-games-consoles/nintendo-switch-2-price-release-date-rumours-b2386412.html';

Given('A published article link directs me to a the login page', () => {
  cy.log('Visiting the Independent UK website via a published article link');
  cy.visit(`/${relativeUrl}`);

  cy.log(
      'Selecting the iframe and clicking the agree button to accept the cookie banner',
  );

  cy.selectIFrameAndConfirmConsent();

  cy.log('Asserting that the login/register button is visible');
  cy.checkLoginRegisterButton();
});


Given('I navigate to the home page and confirm privacy consent', () => {
  cy.log('Visiting the Independent UK website');

  cy.visit('/');

  cy.selectIFrameAndConfirmConsent();

  cy.closePopUp();

});

When('I log in successfully', () => {
  cy.log('Selecting the login/register button and clicking it');
  cy.login();
  cy.contains('A. QA Test').should('exist');

});

When('I choose to register as a new customer', () => {
  cy.log('Selecting the login/register button and clicking it');
  cy.contains('Log in / Register').click();

  cy.log('Selecting the register button and clicking it');
  cy.contains('Register').click();
});

When('I log out', () => {
  cy.log('Selecting the logged in profile and clicking it');

  cy.get('[href="/profile"]').as('profileLink');
  cy.get('@profileLink').first().click({ force: true});

  cy.get('[href="/user/logout"]').as('logoutLink');
  cy.get('@logoutLink').first().click();
});

Then('I am authenticated and redirected to the correct article', () => {
  cy.url().should(
    'eq',
    `${Cypress.config().baseUrl}${relativeUrl}?loginSuccessful`
  );

  cy.contains('A. QA Test').should('exist');
  cy.getCookie('loggedIn').should('exist');
});

Then('The logout is successful', () => {
  cy.url().should('eq', 'https://www.independent.co.uk/');

  cy.checkLoginRegisterButton();
});
