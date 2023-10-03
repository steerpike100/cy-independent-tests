import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('A published article link directs me to a the login page', () => {
	cy.visit(
		'https://www.independent.co.uk/extras/indybest/gadgets-tech/video-games-consoles/nintendo-switch-2-price-release-date-rumours-b2386412.html',
	);
});

When('I log in succesfully', () => {});

Then('I am authenticated and redirected to the correct article', () => {});
