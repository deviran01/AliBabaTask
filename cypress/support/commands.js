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

Cypress.Commands.add('numberOfPassengers', (passanger_type='بزرگسال', count=0) => {
    var counter = count
    cy.get('label').contains('مسافران').click()
    function nop(){
        cy.get('span').contains(passanger_type).parent().parent().find('.a-counter').children('button').first().click()
        counter--;
        if (counter > 1){
            nop();
        }
    }
    nop()
})


Cypress.Commands.add('waitForSearchComplate', () => {
    cy.get('.loading-banner')
    cy.get('.loading-banner', {timeout: 1150000}).should('not.exist');
    cy.get('.tab-links', { timeout: 150000 }).should('be.visible')

})



Cypress.Commands.add('dateSelector', (selectedDate) => {
    // TODO: We can convert it to two functions for start and end time 

    const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
    cy.get('label').contains('تاریخ رفت').click()

    function dateFinder(month, day){
        cy.get('.calendar').then(($calender) =>{
            if($calender.text().includes(monthNames[month])){
                cy.get('.calendar').contains(monthNames[month]).parent().children().find('.calendar-cell').each($x =>{
                    if(String($x.text()).split(' ')[0] == String(day)){
                        cy.wrap($x).click()
                    }
                })
            }else{
                cy.get('.datepicker-arrows').children().last().click()
                dateFinder(month, day)
            }
        })
    }
    
    if (selectedDate == 'today'){
        cy.get('.is-today').click()

    }else if (Number.isInteger(selectedDate)){
        let STATIC_CAL_SPACE = 8
        cy.get('.is-today').parent().parent().children().first().then(($cm) =>{
            var currentMonth = $cm.text()

            cy.get('.is-today', {timeout: 2000}).then($t =>  {
                var today = Number($t.text().replace('-', '').trim())
                var returnDate = today + selectedDate


                cy.get('.calendar').contains(currentMonth).parent().children().last().children().last().then(($lsom) => {
                    var lastDayOfMonth = Number($lsom.text().replace('-', '').trim())

                    if(returnDate > lastDayOfMonth){
                        returnDate = returnDate - lastDayOfMonth
                        var currentMonthIndex = monthNames.indexOf(currentMonth);
                        cy.log(currentMonthIndex)
                        cy.get('.is-today').click()

                        dateFinder(currentMonthIndex + 1 , returnDate)
            
                    }else{
                        cy.get('.is-today').click()

                        cy.get('.calendar').contains(currentMonth).parent().children().last().children().eq( STATIC_CAL_SPACE + day ).click()
            
                    }

                });
            });
        });


    }else{

        function date_spliter(date_time){
            var year, month, day = 0
            let date = String(date_time).split('/')
            if(date.length == 3){
                year = date[0]
                month= date[1] - 1
                day = date[2]

            }else{
                month= date[0] - 1
                day = date[1]
            }
            
            dateFinder(month, day)

        }


        if(String(selectedDate).search('-') > -1){
            date_spliter(String(selectedDate).split('-')[0])
            date_spliter(String(selectedDate).split('-')[1])

        }else{
            date_spliter(selectedDate)
        }

    
    }

    cy.get('button').contains('تایید').click()


    
})