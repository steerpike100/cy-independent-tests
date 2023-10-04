import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const relativeUrl =
	'/extras/indybest/gadgets-tech/video-games-consoles/nintendo-switch-2-price-release-date-rumours-b2386412.html';

Given('A published article link directs me to a the login page', () => {
	cy.log('Visiting the Independent UK website via a published article link');
	cy.visit(
		'https://www.independent.co.uk/extras/indybest/gadgets-tech/video-games-consoles/nintendo-switch-2-price-release-date-rumours-b2386412.html',
	);

	cy.log(
		'Selecting the iframe and clicking the agree button to accept the cookie banner',
	);
	cy.get('iframe[title="SP Consent Message"]')
		.should('be.visible')
		.then(($iframe) => {
			const $body = $iframe.contents().find('body');
			cy.wrap($body).find('button[title="AGREE"]').click();
		});

	cy.log('Asserting that the login/register button is visible');
	cy.contains('Log in / Register').should('be.visible');
});

When('I log in succesfully', () => {
	cy.log('Selecting the login/register button and clicking it');
	//We don't have 'data-***' attributes so use the next strongest selector strategy
	cy.contains('Log in / Register').click();

	cy.log('Entering the email address');
	cy.get('#login-form-email').type('cypress.test@gmail.com');

	cy.log('Entering the password');
	cy.get('#login-form-password').type('Qwerty12345');

	cy.log('Clicking the login button');
	cy.contains('Submit').click();
});

Then('I am authenticated and redirected to the correct article', () => {
	cy.url().should(
		'eq',
		'https://www.independent.co.uk/extras/indybest/gadgets-tech/video-games-consoles/nintendo-switch-2-price-release-date-rumours-b2386412.html',
	);

	cy.contains('A. QA Test').should('exist');
});
