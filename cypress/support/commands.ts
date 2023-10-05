import 'cypress-iframe';
declare global {
	namespace Cypress {
		interface Chainable {
			/** * Custom command to login/
			 * @example cy.login() */
			login(): Chainable<JQuery<HTMLElement>>;
			/**
			 * Custom command to select an iframe and click a button inside it
			 * @example cy.selectIframeAndClickButton(‘SP Consent Message’, ‘AGREE’)
			 */
			selectIFrameAndConfirmConsent(): Chainable<JQuery<HTMLElement>>;
			/** * Custom command to check if the login/register button is visible
			 * @example cy.checkLoginRegisterButton() */
			checkLoginRegisterButton(): Chainable<JQuery<HTMLElement>>;
			/** * Custom command to close a iFrame Offer pop up window if it appears
			 * @example cy.dismissPopUp() */
			closeOfferPopUp(): Chainable<JQuery<HTMLElement>>;
		}
	}
}

function login(): void {
	cy.log(`Logging into the Independent UK Website`);

	cy.log('Selecting the login/register button and clicking it');
	cy.contains('Log in / Register').click();

	cy.log('Entering the email address');
	cy.get('#login-form-email').type('cypress.test@gmail.com');

	cy.log('Entering the password');
	cy.get('#login-form-password').type('Qwerty12345');

	cy.log('Clicking the login button');
	cy.contains('Submit').click();
}

function checkLoginRegisterButton(): void {
	cy.log('Asserting that the login/register button is visible');
	cy.contains('Log in / Register').should('be.visible');
}

function selectIFrameAndConfirmConsent(): void {
	cy.log(
		`Selecting the iframe with title SP Consent Message and clicking the Agree button`,
	);
	cy.get('iframe[title="SP Consent Message"]')
		.should('be.visible')
		.then(($iframe) => {
			const $body = $iframe.contents().find('body');
			cy.wrap($body).find('button[title="AGREE"]').click();
		});
}

function closeOfferPopUp(): void {
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
}

Cypress.Commands.add(
	'selectIFrameAndConfirmConsent',
	selectIFrameAndConfirmConsent,
);

Cypress.Commands.add('checkLoginRegisterButton', checkLoginRegisterButton);

Cypress.Commands.add('closeOfferPopUp', closeOfferPopUp);

Cypress.Commands.add('login', login);
