/// <reference types="cypress" />
describe('Search for Domestic flight tickets', () => {
    beforeEach(() => {
      cy.aliBabaRootUrl()
    })
      it('Search tickets with start and end dates', () => {
        cy.get('[data-test=domestic-tab]').click()
        cy.roundTrip()
        cy.selectSource('تهران')
        cy.selectDestination('مشهد')
        cy.dateSelector('2/2-2/7')
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get('[name=search]').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.contains('تماس با ما').scrollIntoView().should('be.visible').click()
 
      })
  
      it('Search tickets with time period ', () => {
        cy.get('[data-test=domestic-tab]').click()
        cy.roundTrip()
        cy.selectSource('تهران')
        cy.selectDestination('مشهد')
        cy.dateSelector(3)
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get('[name=search]').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.contains('تماس با ما').scrollIntoView().should('be.visible').click()
       
    })

    it('Search today tickets ', () => {
      cy.get('[data-test=domestic-tab]').click()
      cy.selectSource('تهران')
      cy.selectDestination('مشهد')
      cy.dateSelector(3)
      cy.numberOfPassengers('بزرگسال', 2)
      cy.numberOfPassengers('کودک', 2)
      cy.get('[name=search]').click()
      cy.waitForSearchComplate()
      cy.checkResultExist()
      cy.contains('تماس با ما').scrollIntoView().should('be.visible').click()
     
  })
    
  
    }) 
    