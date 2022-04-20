Cypress.Commands.add('alibabaRootUrl', () => {
    cy.visit('https://www.alibaba.ir/')
})

Cypress.Commands.add('roundTrip', (destination) => {
    cy.get('span').contains('یک طرفه').click()
    cy.get('span').contains('رفت و برگشت').click()

})

