Cypress.Commands.add('aliBabaRootUrl', () => {
    cy.visit('https://www.alibaba.ir/', {timeout: 10000})
})

Cypress.Commands.add('roundTrip', (trip_type='یک طرفه') => {
    cy.get('button').find('[data-test=title]').each(($elem) =>{
        if($elem.text() === "یک طرفه"){
            cy.wrap($elem).click()
            cy.get('span').contains(trip_type).click()
        }else if($elem.text() === "رفت و برگشت"){
            cy.wrap($elem).click()
            cy.get('span').contains(trip_type).click()
        }
    })

})

Cypress.Commands.add('selectSource', (source) => {
    cy.get('label').contains('مبدا').click().type(source)
    cy.get('.v-dropdown > .a-card', {timeout: 15000})
    cy.wait(1000)
    cy.get('.destination-item').each($src =>{
        if(String($src.text()).search(source) > -1){
            cy.wrap($src).click()
        }
    })
    cy.wait(1000)
})

Cypress.Commands.add('selectDestination', (destination) => {
    cy.get('label').contains('مقصد').click().type(destination)
    cy.get('.v-dropdown > .a-card', {timeout: 15000})
    cy.wait(1000)
    cy.get('.destination-item').each($des =>{
        if(String($des.text()).search(destination) > -1){
            cy.wrap($des).click()
        }
    })
    cy.wait(1000)
})

Cypress.Commands.add('numberOfPassengers', (passenger_type='بزرگسال', count=0) => {
    var counter = count
    cy.get('label').contains('مسافران').click()
    function nop(){
        cy.get('span').contains(passenger_type).parent().parent().find('.a-counter').children('button').first().click()
        counter--;
        if (counter > 1){
            nop();
        }
    }
    nop()
})


Cypress.Commands.add('waitForSearchComplate', () => {
    cy.get('.loading-banner')
    cy.get('.loading-banner', {timeout: 20000}).should('not.exist');
    cy.get('.tab-links', { timeout: 20000 }).should('be.visible')

})


Cypress.Commands.add('checkResultExist', () => {

    function cr(){
        cy.get('body')
        .then(($body) => {
          if ($body.find('.error-wrapper').length) {
            cy.get('.relative ').contains('روز بعد').click()
            cy.get('.a-loading-dots')
            cy.get('.a-loading-dots', {timeout: 10000}).should('not.exist');
            cr()
        }  
      
        })
    }
    cr()
})


Cypress.Commands.add('dateSelector', (selectedDate) => {
    // TODO: We can convert it to two functions for start and end time 

    const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
    // cy.get('label').contains('تاریخ رفت').click()

    function dateFinder(month, day){
        cy.get('.calendar').then(($calender) =>{
            if($calender.text().includes(monthNames[month])){
                cy.get('.calendar').contains(monthNames[month]).parent().children().find('.calendar-cell').each($x =>{
                    if(String($x.text()).split(' ')[0] === String(day)){
                        cy.wrap($x).click()
                    }
                })
            }else{
                cy.get('.datepicker-arrows').children().last().click()
                dateFinder(month, day)
            }
        })
    }
    
    if (selectedDate === 'today'){
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
                    var currentMonthIndex = monthNames.indexOf(currentMonth);
                    if(returnDate > lastDayOfMonth){
                        returnDate = returnDate - lastDayOfMonth
                        cy.log(currentMonthIndex)
                        cy.get('.is-today').click()

                        dateFinder(currentMonthIndex + 1 , returnDate)
            
                    }else{
                        cy.get('.is-today').click()
                        dateFinder(currentMonthIndex , returnDate)

                        // cy.get('.calendar').contains(currentMonth).parent().children().last().children().eq( STATIC_CAL_SPACE + returnDate ).click()
            
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