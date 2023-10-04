import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('A published article link directs me to a the login page', () => {
	cy.visit(
		'https://www.independent.co.uk/extras/indybest/gadgets-tech/video-games-consoles/nintendo-switch-2-price-release-date-rumours-b2386412.html',
	);
	cy.get('iframe[title="SP Consent Message"]')
		.should('be.visible')
		.then(($iframe) => {
			const $body = $iframe.contents().find('body');
			cy.wrap($body).find('button[title="AGREE"]').click();
		});
});

When('I log in succesfully', () => {});

Then('I am authenticated and redirected to the correct article', () => {});
