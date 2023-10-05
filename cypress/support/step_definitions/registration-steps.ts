///<reference types="cypress"/>
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

When(
	'the user fills in the registration form with an {} email',
	(email: string) => {
		cy.get('[data-tracking-name="Email"]').type(email);
		console.log(
			`Filling in the registration form with an invalid email: ${email}`,
		);
	},
);
