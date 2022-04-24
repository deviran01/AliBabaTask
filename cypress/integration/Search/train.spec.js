/// <reference types="cypress" />
describe('Search for international flight tickets', () => {
    beforeEach(() => {
        cy.aliBabaRootUrl()
        cy.get('[data-test=train-tab]').click()

    })
    it('Search tickets with start and end dates', () => {
        cy.roundTrip('رفت و برگشت')
        cy.selectSource('مشهد')
        cy.selectDestination('تهران')
        cy.dateSelector('2/2-2/7')
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get("button").contains('جستجو').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.window().scrollTo('bottom')
        cy.contains('تماس با ما').click()

    })

    it('Search tickets with time period ', () => {
        cy.roundTrip('رفت و برگشت')
        cy.selectSource('مشهد')
        cy.selectDestination('تهران')
        cy.dateSelector(3)
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get("button").contains('جستجو').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.window().scrollTo('bottom')
        cy.contains('تماس با ما').click()

    })

    it('Search today tickets ', () => {
        cy.roundTrip('یک طرفه')
        cy.selectSource('مشهد')
        cy.selectDestination('تهران')
        cy.dateSelector('today')
        cy.numberOfPassengers('بزرگسال', 2)
        cy.numberOfPassengers('کودک', 2)
        cy.get("button").contains('جستجو').click()
        cy.waitForSearchComplate()
        cy.checkResultExist()
        cy.window().scrollTo('bottom')
        cy.contains('تماس با ما').click()

    })


})