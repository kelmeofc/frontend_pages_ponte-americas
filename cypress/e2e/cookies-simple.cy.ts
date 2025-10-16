describe('Cookies Modal - Simple Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Hydration failed')) {
        return false;
      }
      return true;
    });
    
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should show cookies modal on first visit', () => {
    // Aguarda hidratação
    cy.wait(2000);
    
    // Modal deve aparecer
    cy.get('[data-cookies-modal]', { timeout: 10000 }).should('be.visible');
    cy.get('[aria-labelledby="cookies-title"]').should('contain', 'Preferências de cookies');
  });

  it('should accept all cookies and hide modal', () => {
    cy.wait(2000);
    
    // Modal deve aparecer
    cy.get('[data-cookies-modal]', { timeout: 10000 }).should('be.visible');
    
    // Clica em "Aceitar todos"
    cy.get('button[aria-label="Aceitar todos os cookies"]')
      .should('be.visible')
      .click();
    
    // Modal deve desaparecer
    cy.get('[data-cookies-modal]').should('not.exist');
    
    // Verifica localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('pdmi_consent_choice_v2')).to.equal('accepted');
    });
  });

  it('should not show modal if user already responded', () => {
    // Simula resposta prévia
    cy.window().then((win) => {
      win.localStorage.setItem('pdmi_consent_choice_v2', 'accepted');
    });
    
    cy.reload();
    cy.wait(2000);
    
    // Modal não deve aparecer
    cy.get('[data-cookies-modal]').should('not.exist');
  });
});