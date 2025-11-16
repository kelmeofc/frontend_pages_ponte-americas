/**
 * E2E Tests for GSAP Section Animations
 * 
 * Simplified tests focusing on core functionality
 */

describe('GSAP Section Animations', () => {
  // Ignore hydration errors from Next.js
  Cypress.on('uncaught:exception', (err) => {
    // Ignore hydration errors
    if (err.message.includes('Hydration') || err.message.includes('hydration')) {
      return false;
    }
    // Ignore other React errors that don't affect animation tests
    if (err.message.includes('Minified React error')) {
      return false;
    }
    return true;
  });

  describe('Home Page Animations', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait(1000);
    });

    it('should have animated sections on home page', () => {
      // Check that sections have animation attributes
      cy.get('[data-animate-section]').should('have.length.greaterThan', 5);
    });

    it('should animate sections on scroll', () => {
      // Scroll to benefits section
      cy.get('#benefits').scrollIntoView({ duration: 1000 });
      cy.wait(1500);

      // Benefits section should be visible
      cy.get('#benefits').should('be.visible');
    });

    it('should have child elements with animate-child class', () => {
      // Scroll to benefits section with child animations
      cy.get('#benefits').scrollIntoView({ duration: 1000 });
      cy.wait(1500);

      // Check that child elements exist
      cy.get('#benefits .animate-child').should('exist');
    });

    it('should handle scrolling through multiple sections', () => {
      // Scroll through page
      cy.scrollTo('bottom', { duration: 3000 });
      cy.wait(1000);

      // Verify we can scroll
      cy.window().its('scrollY').should('be.greaterThan', 100);
    });
  });

  describe('Landing Page Animations', () => {
    beforeEach(() => {
      cy.visit('/lp');
      cy.wait(1000);
    });

    it('should have animated sections on LP', () => {
      // Check that LP has animation attributes
      cy.get('[data-animate-section]').should('have.length.greaterThan', 3);
    });

    it('should animate LP sections on scroll', () => {
      // Scroll to teacher section
      cy.get('#teacher').scrollIntoView({ duration: 1000 });
      cy.wait(1500);

      // Teacher section should be visible
      cy.get('#teacher').should('be.visible');
    });

    it('should work on both home and LP pages', () => {
      // Visit home page
      cy.visit('/');
      cy.wait(1000);
      cy.get('[data-animate-section]').should('exist');

      // Navigate to LP
      cy.visit('/lp');
      cy.wait(1000);
      cy.get('[data-animate-section]').should('exist');
    });
  });
});
