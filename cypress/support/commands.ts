import 'cypress-iframe';
import 'cypress-localstorage-commands';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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
      closePopUpWindow(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

function login(): void {
  cy.log(`Logging into the Independent UK Website`);

  cy.log('Selecting the login/register button and clicking it');
  cy.contains('Log in / Register').click();

  cy.log('Entering the email address');
  //email obfuscated for security reasons
  cy.get('#login-form-email').type(process.env.EMAIL_ADDRESS);

  cy.log('Entering the password');
  //password obfuscated for security reasons
  cy.get('#login-form-password').type(process.env.PASSWORD);

  cy.log('Clicking the login button');
  cy.contains('Submit').click();
}

function checkLoginRegisterButton(): void {
  cy.log('Asserting that the login/register button is visible');
  cy.contains('Log in / Register').should('be.visible');
}

function selectIFrameAndConfirmConsent(): void {
  cy.log(
    `Selecting the iframe with title SP Consent Message and clicking the Agree button`
  );
  cy.get('iframe[title="SP Consent Message"]')
    .should('be.visible')
    .then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).find('button[title="AGREE"]').click();
    });
}

function closePopUp(): void {
  cy.log(`Selecting the iframe with title SP Consent Message and clicking the Agree button`);

  // Use .should() with { timeout: 0 } to wait indefinitely
  cy.get('div.tp-modal').should('be.visible', { timeout: 0 }).then(($div) => {
    if ($div.length > 0) {
      cy.wrap($div)
          .find('iframe[title^="offer"]')
          .should('be.visible')
          .then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('button[class="pn-template__close unbutton"]').click();
          });
    } else {
      cy.log('Parent element div.tp-modal is not found.');
    }
  });
}

function closePopUpWindow(): void {
  // Get the iframe element by its id
  cy.get('iframe[title^="offer"]')
      .should('have.attr', 'src')
      .and('not.be.empty')
      .then(($iframe) => {
        cy.wrap($iframe)
            .should('have.prop', 'contentDocument')
            .and('not.be.empty')
            .its('readyState')
            .should('eq', 'complete');
        if ($iframe.length > 0) {
          const iframe = $iframe[0] as HTMLIFrameElement;
          const doc = iframe.contentDocument;
          cy.wrap(doc);
          cy.wrap(doc)
              .find('button[class="pn-template__close unbutton"]')
              .click();
          cy.wrap(doc).find('.modal').should('not.be.visible');
        }
      });
}

//Alternative pop up close function
function closeOfferPopUp(): void {
  cy.on('uncaught:exception', (err, runnable) => {
    cy.log(`Uncaught exception: ${err.message}`);
    return false;
  });

  cy.get('iframe[title^="offer"]', { timeout: 10000 }).then(($iframe) => {
    if ($iframe.length > 0) {
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
  selectIFrameAndConfirmConsent
);

Cypress.Commands.add('checkLoginRegisterButton', checkLoginRegisterButton);

Cypress.Commands.add('closeOfferPopUp', closeOfferPopUp);
Cypress.Commands.add('closePopUpWindow', closePopUpWindow);
Cypress.Commands.add('closePopUp', closePopUp);

Cypress.Commands.add('login', login);

Cypress.Commands.add('randomPasswordGenerator', randomPasswordGenerator);
