// Comandos customizados para testes de cookies

declare global {
  namespace Cypress {
    interface Chainable {
      clearConsent(): Chainable<void>;
      setConsent(choice: 'accepted' | 'essentials_only' | 'denied'): Chainable<void>;
      expectConsent(choice: 'accepted' | 'essentials_only' | 'denied'): Chainable<void>;
      waitForConsentEvent(): Chainable<CustomEvent>;
    }
  }
}

Cypress.Commands.add('clearConsent', () => {
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.localStorage.removeItem('pdmi_consent_choice_v2');
  });
});

Cypress.Commands.add('setConsent', (choice: 'accepted' | 'essentials_only' | 'denied') => {
  cy.window().then((win) => {
    win.localStorage.setItem('pdmi_consent_choice_v2', choice);
  });
});

Cypress.Commands.add('expectConsent', (choice: 'accepted' | 'essentials_only' | 'denied') => {
  cy.window().then((win) => {
    expect(win.localStorage.getItem('pdmi_consent_choice_v2')).to.equal(choice);
  });
});

Cypress.Commands.add('waitForConsentEvent', () => {
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      win.addEventListener('pdmi:consent', (event: Event) => {
        resolve(event as CustomEvent);
      });
    });
  });
});

export {};

