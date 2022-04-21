/// <reference types="cypress" />
describe('Search for international flight tickets', () => {
    beforeEach(() => {
      cy.aliBabaRootUrl()
      cy.get('[data-test=iranout-tab]').click()

    })
      it('Search tickets with start and end dates', () => {
   //     cy.roundTrip()
        cy.selectSource('فرودگاه بین المللی امام خمینی')
        cy.selectDestination('فرودگاه صابیحا گوکچن')
        cy.dateSelector('2/2-2/7')
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get('[name=search]').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.contains('تماس با ما').scrollIntoView().should('be.visible').click()
 
      })
  
      it('Search tickets with time period ', () => {
   //     cy.roundTrip()
        cy.selectSource('فرودگاه بین المللی امام خمینی')
        cy.selectDestination('فرودگاه صابیحا گوکچن')
        cy.dateSelector(3)
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get('[name=search]').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.contains('تماس با ما').scrollIntoView().should('be.visible').click()
       
    })

    it('Search today tickets ', () => {
      cy.selectSource('فرودگاه بین المللی امام خمینی')
      cy.selectDestination('فرودگاه صابیحا گوکچن')
      cy.dateSelector('today')
      cy.numberOfPassengers('بزرگسال', 2)
      cy.numberOfPassengers('کودک', 2)
      cy.get('[name=search]').click()
      cy.waitForSearchComplate()
      cy.checkResultExist()
      cy.contains('تماس با ما').scrollIntoView().should('be.visible').click()
     
  })
    
  
}) 