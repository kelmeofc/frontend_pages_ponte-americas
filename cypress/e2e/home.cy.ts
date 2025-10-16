describe('Página Principal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('deve carregar a página principal corretamente', () => {
    // Verifica se a página carregou
    cy.get('body').should('be.visible')
    
    // Verifica elementos principais da navegação
    cy.get('nav').should('exist')
    cy.get('header').should('be.visible')
    
    // Verifica seções principais
    cy.get('main').should('be.visible')
    
    // Verifica o rodapé
    cy.get('footer').should('be.visible')
  })

  it('deve ter links de navegação funcionando', () => {
    // Verifica se os links principais estão presentes e clicáveis
    cy.get('nav a').should('have.length.at.least', 1)
    cy.get('nav a').first().should('have.attr', 'href')
  })

  it('deve ter menus dropdown funcionando corretamente', () => {
    // Testa o menu Produtos
    cy.get('[data-testid="menu-produtos"]').click()
    cy.get('[data-testid="submenu-registro-de-marca"]').should('be.visible')
    cy.get('[data-testid="submenu-registro-de-marca"]').click()
    cy.url().should('include', '/registro-de-marca')

    // Volta para a página inicial
    cy.visit('/')

    // Testa o menu Ferramentas
    cy.get('[data-testid="menu-ferramentas"]').click()
    cy.get('[data-testid="submenu-consulta-de-marca"]').should('be.visible')
    cy.get('[data-testid="submenu-consulta-de-marca"]').click()
    cy.url().should('include', '/consulta-inpi')
  })

  it('deve navegar corretamente pelos links internos', () => {
    // Testa navegação para Produtos
    cy.get('[data-testid="menu-produtos"]').click()
    cy.get('[data-testid="submenu-registro-de-marca"]').click()
    cy.url().should('include', '/registro-de-marca')
    cy.go('back')

    // Testa navegação para Ferramentas
    cy.get('[data-testid="menu-ferramentas"]').click()
    cy.get('[data-testid="submenu-consulta-de-marca"]').click()
    cy.url().should('include', '/consulta-inpi')
    cy.go('back')

    // Verifica se voltou para a página inicial
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('deve ter conteúdo principal visível', () => {
    // Verifica se há conteúdo principal na página
    cy.get('main').should('not.be.empty')
    
    // Verifica se há títulos na página
    cy.get('h1, h2, h3').should('exist')
  })

  it('deve ter elementos responsivos', () => {
    // Testa em viewport mobile
    cy.viewport('iphone-x')
    cy.get('nav').should('be.visible')
    cy.get('main').should('be.visible')
    
    // Testa em viewport desktop
    cy.viewport('macbook-15')
    cy.get('nav').should('be.visible')
    cy.get('main').should('be.visible')
  })

  it('deve manter o estado do dropdown ao navegar', () => {
    // Testa persistência do estado do dropdown após navegação
    cy.get('[data-testid="menu-produtos"]').click()
    cy.get('[data-testid="submenu-registro-de-marca"]').should('be.visible')
    cy.get('[data-testid="submenu-registro-de-marca"]').click()
    cy.go('back')
    cy.get('[data-testid="menu-produtos"]').click()
    cy.get('[data-testid="submenu-registro-de-marca"]').should('be.visible')
  })
}) 