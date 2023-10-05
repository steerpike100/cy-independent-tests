///<reference types="cypress"/>
///<reference types="cypress-iframe" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

When('I fill in and submit the registration form with valid details', () => {
	const randomEmail = faker.internet.email();
	const randomFirstName = faker.person.firstName();
	const randomLastName = faker.person.lastName();
	//use faker to generate a random year between 1970 and 1990
	const randomBirthYear = faker.date
		.between('1970-01-01', '1990-12-31')
		.getFullYear();

	//const password
	const randomPassword = cy.randomPasswordGenerator(12);
	cy.closeOfferPopUp();

	cy.log('Entering the email address into the Registration Form');
	//Use a hknown value from run configuration for the exercise to allow deletion from prod database
	cy.get('[data-tracking-name="Email"]').type('stevejbartholomew@gmail.com');

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
	cy.get('[data-tracking-name="Password"]').type('Ae678!3nD5');

	cy.log('Checking the Offers Check box in the Registration Form');
	cy.get('#form-receive-offer').scrollIntoView().check();

	cy.log('Opening the Opt-out panel in the Registration Form');
	cy.clickDropdownPanel();

	cy.log('Closing the Opt-out panel in the Registration Form');
	cy.clickDropdownPanel();

	cy.log('Clicking the Create My Account button in the Registration Form');
	cy.get('button[name="register-form-submit"]').click();
});

When(
	'the user fills in the registration form with an {} email',
	(email: string) => {
		cy.get('[data-tracking-name="Email"]').type(email);
		console.log(
			`Filling in the registration form with an invalid email: ${email}`,
		);
	},
);

Then('I should see a Thank you for registering message', () => {
	cy.log('Asserting that the user sees the Thank you for registering page');
	cy.title().should('eq', 'Thank you for registering');
});
