import { buildQueryParam } from "../support/commands";
import { HomePage } from "../support/pages/home_page"
const specTitle = require("cypress-sonarqube-reporter/specTitle")

describe(specTitle("DESKTOP mode - Search with cases that the site doesn't handle now"), function() {
    let homePage = new HomePage()

    before('Visit home page & wait for mini-search available', function() {        
        cy.visit('/').then(() => {
            homePage.waitUntilPageLoaded()     
            homePage.getDesktopHeader().waitForAvailable()
        })
    }) 

    it ("Search with spaces", function() {
        let searchResult = homePage.getDesktopHeader().searchWeather("      ")                
        searchResult.verifySearchSpacesResult()
    })
  
    it.only("Search weather with special data", function() {  
        cy.fixture('unhandled_data').then($dataTest => {
            $dataTest.forEach(data => {         
                cy.log(data.case)
                let qParam = buildQueryParam(data)
                let searchResult = homePage.getDesktopHeader().searchWeather(qParam)                
                searchResult.verifyUnhandledCases()
            })               
        })       
    })
})