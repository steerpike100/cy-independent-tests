///<reference types="cypress"/>
///<reference types="cypress-iframe" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const relativeUrl =
	'/extras/indybest/gadgets-tech/video-games-consoles/nintendo-switch-2-price-release-date-rumours-b2386412.html';

Given('I navigate to the home page and confirm privacy consent', () => {
	cy.log('Visiting the Independent UK website');

	cy.visit('/');

	cy.selectIFrameAndConfirmConsent();

	// cy.closeOfferPopUpIfVisible();
});

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

When('I log in succesfully', () => {
	cy.log('Selecting the login/register button and clicking it');
	cy.login();
});

When('I choose to register as a new customer', () => {
	cy.log('Selecting the login/register button and clicking it');
	cy.contains('Log in / Register').click();

	cy.log('Selecting the register button and clicking it');
	cy.contains('Register').click();

	cy.frameLoaded('iframe[title^="offer"]', {
		url: 'https://api.tinypass.com/checkout/template',
	})
		.should('be.visible')
		.then(($iframe) => {
			const $body = $iframe.contents().find('body');
			cy.wrap($body)
				.find('button[class="pn-template__close unbutton"]')
				.click();
		});

	// cy.get('iframe[title*="offer"]').then(($iframe) => $iframe[0].remove);

	// const getIframeDocument = () => {
	// 	return (
	// 		cy
	// 			.get('iframe[data-cy="the-frame"]')
	// 			// Cypress yields jQuery element, which has the real
	// 			// DOM element under property "0".
	// 			// From the real DOM iframe element we can get
	// 			// the "document" element, it is stored in "contentDocument" property
	// 			// Cypress "its" command can access deep properties using dot notation
	// 			// https://on.cypress.io/its
	// 			// cy.its also waits for the property to exist
	// 			.its('0.contentDocument')
	// 	);
	// };

	// cy.closePopUpWindow();
});

When('I log out', () => {
	cy.log('Selecting the logged in profile and clicking it');

	cy.get('[href="/profile"]').as('profileLink');
	cy.get('@profileLink').first().click();

	cy.get('[href="/user/logout"]').as('logoutLink');
	cy.get('@logoutLink').first().click();
});

Then('I am authenticated and redirected to the correct article', () => {
	cy.url().should(
		'eq',
		'https://www.independent.co.uk/extras/indybest/gadgets-tech/video-games-consoles/nintendo-switch-2-price-release-date-rumours-b2386412.html?loginSuccessful',
	);

	cy.contains('A. QA Test').should('exist');
	cy.getCookie('loggedIn').should('exist');
});

Then('The logout is successful', () => {
	cy.url().should('eq', 'https://www.independent.co.uk/');

	cy.checkLoginRegisterButton();
});
