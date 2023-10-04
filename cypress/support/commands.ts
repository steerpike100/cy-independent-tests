// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// commands.ts
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
			closePopUpWindow(): Chainable<JQuery<HTMLElement>>;
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

// function selectIFrameAndCloseOfferPopUp(): void {
// 	cy.log('Selecting the iframe and closing the offer pop up');
// 	cy.get('iframe[title*=offer]')
// 		.should('be.visible')
// 		.then(($iframe) => {
// 			const $body = $iframe.contents().find('body');
// 			cy.wrap($body).find('button[class="pn-template__close"]').click();
// 		});
// 	cy.get('.register-prompt', { timeout: 10000 }).first().as('subscribePopUp');

// 	cy.get('@subscribePopUp')
// 		.should('exist')
// 		.then(($popUp) => {
// 			if ($popUp.length > 0) {
// 				cy.get('button[class="pn-template__close"]').first().click();
// 			}
// 		});
// }

// function closeOfferPopUpIfVisible(): void {
// 	cy.log('Checking for and closing the offer pop-up');

// 	// Select the iframe by its title attribute
// 	cy.get('iframe[title*="offer"]')
// 		.should('exist')
// 		.then(($iframe) => {
// 			// Switch to the iframe context
// 			cy.wrap($iframe).then(($iframeElement) => {
// 				// Check if the pop-up exists within the iframe
// 				if (
// 					$iframeElement.contents().find('.pn-template__close')
// 						.length > 0
// 				) {
// 					// If the pop-up exists, click the close button
// 					cy.wrap($iframeElement.contents())
// 						.find('.pn-template__close')
// 						.click();
// 				}

// 				// Switch back to the default content
// 				cy.visit('about:blank');
// 			});
// 		});
// }

//write a custom command to dismiss a pop-up if it appears within the iframe
// Import the HTMLIFrameElement type

// Define the function to close the modal if it appears
function closePopUpWindow(): void {
	// Get the iframe element by its id
	cy.get('iframe[title*="offer"]')
		.should('have.attr', 'src')
		.and('not.be.empty')
		.then(($iframe) => {
			cy.wrap($iframe)
				.should('have.prop', 'contentDocument')
				.and('not.be.empty')
				.its('readyState')
				.should('eq', 'complete');
			// Check if the jQuery object contains any elements
			if ($iframe.length > 0) {
				// Cast the iframe element to the HTMLIFrameElement type
				const iframe = $iframe[0] as HTMLIFrameElement;
				// Access the contentDocument property of the iframe element and wrap it with cy.wrap()
				const doc = iframe.contentDocument;
				cy.wrap(doc);
				// Find and click the close button element and assert that the modal is not visible
				cy.wrap(doc)
					.find('button[class="pn-template__close unbutton"]')
					.click();
				cy.wrap(doc).find('.modal').should('not.be.visible');
			}
		});
}

Cypress.Commands.add(
	'selectIFrameAndConfirmConsent',
	selectIFrameAndConfirmConsent,
);

Cypress.Commands.add('checkLoginRegisterButton', checkLoginRegisterButton);

Cypress.Commands.add('closePopUpWindow', closePopUpWindow);

Cypress.Commands.add('login', login);
