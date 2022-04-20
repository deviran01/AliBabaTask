Cypress.Commands.add('alibabaRootUrl', () => {
    cy.visit('https://www.alibaba.ir/')
})

Cypress.Commands.add('roundTrip', (destination) => {
    cy.get('span').contains('یک طرفه').click()
    cy.get('span').contains('رفت و برگشت').click()

})

Cypress.Commands.add('selectSource', (source) => {
    cy.get('label').contains('مبدا').click().type(source)
    cy.get('.destination-item').contains(source).click()

})

Cypress.Commands.add('selectdestination', (destination) => {
    cy.get('label').contains('مقصد').click().type(destination)
    cy.get('.destination-item').contains(destination).click()

})