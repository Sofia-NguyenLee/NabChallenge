import { buildQueryParam } from "../support/commands"
import { HomePage } from "../support/pages/home_page"
const specTitle = require("cypress-sonarqube-reporter/specTitle")

describe(specTitle('DESKTOP mode - Call current weather data for valid equivalence class'), function() {
    let homePage = new HomePage()

    before('Visit home page & wait for mini-search available', function() {        
        cy.visit('/').then(() => {
            homePage.waitUntilPageLoaded()     
            homePage.getDesktopHeader().waitForAvailable()
        })
    }) 
  
    it("Search weather by valid city", function() {  
        cy.fixture('valid_data').then($dataTest => {
            $dataTest.forEach(data => {         
                let qParam = buildQueryParam(data)
                let searchResult = homePage.getDesktopHeader().searchWeather(qParam)
                searchResult.verifyDisplayedQParam(qParam)                            
                let forecastResult = searchResult.verifyFoundResult()
                                                .viewResultItem(0)
                homePage.waitUntilPageLoaded()                                                
                //forecastResult.verifyDisplayedCity($ver)
                forecastResult.verifyDateTimeByTimezone(data.timezone)
                                .verifyForecastTemperature()
                homePage.convertTemperature()
            })               
        })       
    })
})