const { HomePage } = require("../support/pages/home_page")
const specTitle = require("cypress-sonarqube-reporter/specTitle")

describe(specTitle('Convert temperature for default location'), function() {
    let homePage = new HomePage()
    before('Visit home page & wait until page loaded', function() {        
        cy.visit('/').then(() => {
            homePage.waitUntilPageLoaded() 
        })
    }) 

    it("Convert temperature", function() {
        homePage.getForecastWeather().getDisplayedCity().then($element => {
            // cy.log('My location: ' + $element.text())
            assert.isAbove($element.text().indexOf('VN'), 0)
        })
        homePage.convertTemperature()
    })
})