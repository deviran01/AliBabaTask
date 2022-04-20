/// <reference types="cypress" />
describe('Search for Domestic flight tickets', () => {
    beforeEach(() => {
      cy.alibaba_root_url()
    })
      it('Search tickets with start and end dates', () => {
        cy.get('[data-test=domestic-tab]').click()
        cy.roundTrip()
        cy.selectSource('تهران')
        cy.destinationSource('مشهد')
 
      })
  
      it('Search tickets with time period ', () => {
        cy.get('[data-test=domestic-tab]').click()
        cy.roundTrip()
        cy.selectSource('تهران')
        cy.destinationSource('مشهد')
       
    })
    
  
    }) 
    