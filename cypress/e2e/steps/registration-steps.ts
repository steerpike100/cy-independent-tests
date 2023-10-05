///<reference types="cypress"/>
///<reference types="cypress-iframe" />
import {  When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import {loginButton,usernameInput,passwordInput} from "../selectors.js";

/**
 * @description
 * This step definition uses a mix of centrally stored locators and hard coded locators to demonstrate the use of both
 * it also uses a third party library to generate random data for the registration form
 */
When('I fill in and submit the registration form with valid details', () => {
  const randomEmail = faker.internet.email();
  const randomFirstName = faker.person.firstName();
  const randomLastName = faker.person.lastName();
  //use faker to generate a random year between 1970 and 1990
  const randomBirthYear = faker.date
    .between('1970-01-01', '1990-12-31')
    .getFullYear();

  const randomPassword = cy.randomPasswordGenerator(12);

  cy.log('Entering the email address into the Registration Form');
  //Use a known value from run configuration for the exercise to allow deletion from prod database
  cy.get(usernameInput).type(process.env.EMAIL_ADDRESS);

  //Do not generate random email address for the purpose of this test
  //cy.log(`The randomly generated email for this registration is: ${randomEmail}`);
  //cy.get('[data-tracking-name="Email"]').type(randomEmail);

  cy.log('Entering the First Name into the Registration Form');
  cy.get('[data-tracking-name="First Name"]').type(randomFirstName);

  cy.log('Entering the Last Name into the Registration Form');
  cy.get('[data-tracking-name="Last Name"]').type(randomLastName);

  cy.log('Entering the Year of Birth into the Registration Form');
  // cy.get('select[name="birthYear"]').select(randomBirthYear);
  cy.get('select[name="birthYear"]').select('1980');

  cy.log('Entering the Password into the Registration Form');
  cy.log(`The Random password is '${randomPassword}`);
  cy.get(passwordInput).type('Ae678!3nD5');

  cy.log('Checking the Offers Check box in the Registration Form');
  cy.get('#form-receive-offer').scrollIntoView().check({ force: true });

  cy.log('Opening the Opt-out panel in the Registration Form');
  cy.clickDropdownPanel();

  cy.log('Closing the Opt-out panel in the Registration Form');
  cy.clickDropdownPanel();

  cy.log('Clicking the Create My Account button in the Registration Form');
  cy.get(loginButton, { timeout: 10000 })
    .should('be.visible')
    .click();
});

When('the user enters {} as their email', (email: string) => {
  cy.get('[data-tracking-name="Email"]').type(email, {
    delay: 10,
    force: true,
  });
  cy.log(`Filling in the registration form with an invalid email: ${email}`);
});

When('the user enters {} as their first name', (firstName: string) => {
  cy.get('[data-tracking-name="First Name"]').type(firstName, { force: true });
  cy.log(
    `Filling in the registration form with an invalid firstName: ${firstName}`
  );
});

When('the user enters {} as their last name', (lastName: string) => {
  cy.get('[data-tracking-name="Last Name"]').type(lastName, {
    delay: 10,
    force: true,
  });
  cy.log(
    `Filling in the registration form with an invalid lastName: ${lastName}`
  );
});

When('the user enters {} as their password', (password: string) => {
  cy.get('[data-tracking-name="Password"]').type(password, { force: true });
  cy.log(
    `Filling in the registration form with an invalid password: ${password}`
  );
});

When('the user submits the registration form', () => {
  cy.log('Clicking the Create My Account button in the Registration Form');
});

/**The 'unsual activity detected' warning is preventing the test from passing
 * This is a known issue and is being investigated
 */
Then('I should see a Thank you for registering message', () => {
  cy.log('Asserting that the user sees the Thank you for registering page');
  cy.title().should('eq', 'Thank you for registering');
});

Then(
  'the user should see an {} error message for the {} field',
  (errorMessage: string, field: string) => {
    cy.log('Asserting that the user sees an error message');

    cy.contains('label', field)
      .should('exist')
      .invoke('text')
      .then((labelText) => {
        cy.contains('label', labelText)
          .siblings('p.csr-error-message')
          .should('be.visible')
          .should('contain', errorMessage);
      });
  }
);
