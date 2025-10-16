describe('Cookies Modal - Verification', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Hydration failed')) {
        return false;
      }
      return true;
    });
    
    cy.clearLocalStorage();
  });

  it('should verify modal is working in browser', () => {
    cy.visit('/');
    cy.wait(3000);
    
    // Verifica se há algum elemento relacionado a cookies
    cy.get('body').then(($body) => {
      const html = $body.html();
      console.log('Page contains "cookies":', html.includes('cookies'));
      console.log('Page contains "Preferências":', html.includes('Preferências'));
      console.log('Page contains "Aceitar todos":', html.includes('Aceitar todos'));
    });
    
    // Verifica se há elementos com data-cookies-modal
    cy.get('body').find('[data-cookies-modal]').then(($el) => {
      console.log('Found data-cookies-modal elements:', $el.length);
    });
    
    // Verifica se há elementos com role dialog
    cy.get('body').find('[role="dialog"]').then(($el) => {
      console.log('Found dialog elements:', $el.length);
    });
    
    // Verifica se há botões de cookies
    cy.get('body').find('button').then(($buttons) => {
      console.log('Total buttons found:', $buttons.length);
      $buttons.each((i, btn) => {
        const text = btn.textContent;
        if (text && (text.includes('Aceitar') || text.includes('cookies'))) {
          console.log(`Button ${i}: ${text}`);
        }
      });
    });
  });

  it('should test modal with different approach', () => {
    cy.visit('/');
    cy.wait(5000); // Aguarda mais tempo
    
    // Tenta encontrar o modal de diferentes formas
    cy.get('[data-cookies-modal]', { timeout: 15000 }).should('exist');
  });
});

