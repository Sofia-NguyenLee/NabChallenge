import { buildQueryParam } from "../support/commands"
import { HomePage } from "../support/pages/home_page"
const specTitle = require("cypress-sonarqube-reporter/specTitle")

describe(specTitle('DESKTOP mode - Call current weather data for for invalid equivalence class'), function() {
    let homePage = new HomePage()

    before('Visit home page', function() {        
        cy.visit('/') 
    }) 

    beforeEach('Wait for page load completed', function() {        
        homePage.waitUntilPageLoaded()
        homePage.getDesktopHeader().waitForAvailable()
    })

    let available_fixtures = [
        {
            context: 'Search weather with invalid city',
            file: 'invalid_data'
        },
        {
            context: 'Search weather with injection data',
            file: 'injection'
        }
    ]

    available_fixtures.forEach($fixture => {
        it($fixture.context, function() {
            cy.fixture($fixture.file).then($dataTest => {
                $dataTest.forEach(data => { 
                    cy.log(data.case)
                    let qParam = buildQueryParam(data)
                    let searchResult = homePage.getDesktopHeader().searchWeather(qParam)
                    searchResult.verifyDisplayedQParam(qParam)
                                .verifyNotFoundResult()
                })                
            })       
        })
    })    
})