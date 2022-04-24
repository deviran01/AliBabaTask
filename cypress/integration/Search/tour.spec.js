/// <reference types="cypress" />
describe('Search for Tour tickets', () => {
    beforeEach(() => {
        cy.aliBabaRootUrl()
        cy.get('[data-test=tour-tab]').click()

    })
    it('Search tickets with start and end dates', () => {
        cy.selectSource('تهران')
        cy.selectDestination('دبی')
        cy.dateSelector('2/8-2/16')
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get("button").contains('جستجو').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.window().scrollTo('bottom')
        cy.contains('تماس با ما').click()


    })

    it('Search tickets with time period ', () => {
        cy.selectSource('تهران')
        cy.selectDestination('دبی')
        cy.dateSelector(3)
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get("button").contains('جستجو').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.window().scrollTo('bottom').contains('تماس با ما').click()

    })

    it('Search today tickets ', () => {
        cy.selectSource('تهران')
        cy.selectDestination('دبی')
        cy.dateSelector('today')
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get("button").contains('جستجو').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.window().scrollTo('bottom').contains('تماس با ما').click()

    })


})