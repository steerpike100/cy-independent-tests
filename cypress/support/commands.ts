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
			/** * Custom command to open or close opt in/out panel/
			 * @example cy.clickDropdownPanel() */
			clickDropdownPanel(): Chainable<JQuery<HTMLElement>>;
			/** * Custom command to generate a random password/
			 * @example cy.randomPasswordGenerator(10) */
			randomPasswordGenerator(length: number): string;
			/** * Custom command to close pop up/
			 * @example cy.closePopUp() */
			closePopUp(): Chainable<JQuery<HTMLElement>>;
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

//using cypress-iframe
function closePopUp(): void {
	cy.on('uncaught:exception', (err, runnable) => {
		// Handle any uncaught exceptions here, such as logging the error
		cy.log(`Uncaught exception: ${err.message}`);
		return false; // Prevent Cypress from failing the test
	});

	cy.get('iframe[title^="offer"]', { timeout: 5000 }) // Adjust the timeout as needed
		.then(($iframe) => {
			if ($iframe.length > 0) {
				cy.wrap($iframe).then(($iframe) => {
					if (
						$iframe
							.contents()
							.find('body')
							.find('button[class="pn-template__close unbutton"]')
							.length > 0
					) {
						cy.wrap(
							$iframe
								.contents()
								.find('body')
								.find(
									'button[class="pn-template__close unbutton"]',
								),
						).click();
					} else {
						cy.log('Popup did not appear.');
					}
				});
			} else {
				cy.log('Iframe not found.');
			}
		});
}

//native handler
function closeOfferPopUp(): void {
	// Handle any uncaught exceptions here, such as logging the error
	cy.on('uncaught:exception', (err, runnable) => {
		cy.log(`Uncaught exception: ${err.message}`);
		return false; // Prevent Cypress from failing the test
	});

	// Check if the iframe exists (shorter timeout)
	cy.get('iframe[title^="offer"]', { timeout: 2000 }).then(($iframe) => {
		if ($iframe.length > 0) {
			// If iframe exists, interact with its contents
			cy.wrap($iframe).then(($iframe) => {
				const closeButton = $iframe
					.contents()
					.find('button.pn-template__close.unbutton');
				if (closeButton.length > 0) {
					closeButton.click();
				} else {
					cy.log('Popup did not appear.');
				}
			});
		} else {
			cy.log('Iframe not found.');
		}
	});
}

function clickDropdownPanel(): void {
	cy.get('.opt-out-policy-label').find('svg').click();
}

function randomPasswordGenerator(length: number): string {
	const charset =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';
	let password = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset.charAt(randomIndex);
	}

	return password;
}

Cypress.Commands.add('clickDropdownPanel', clickDropdownPanel);

Cypress.Commands.add(
	'selectIFrameAndConfirmConsent',
	selectIFrameAndConfirmConsent,
);

Cypress.Commands.add('checkLoginRegisterButton', checkLoginRegisterButton);

Cypress.Commands.add('closeOfferPopUp', closeOfferPopUp);
Cypress.Commands.add('closePopUp', closePopUp);

Cypress.Commands.add('login', login);

Cypress.Commands.add('randomPasswordGenerator', randomPasswordGenerator);
