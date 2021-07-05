const { HomePage } = require("../support/pages/home_page")
const specTitle = require("cypress-sonarqube-reporter/specTitle")

describe(specTitle('Convert temperature for default location'), function() {
    let homePage = new HomePage()
    before('Visit home page & wait until page loaded', function() {        
        cy.visit('/').then(() => {
            homePage.waitUntilPageLoaded() 
        })
    }) 

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
      
    function success(pos) {
        var crd = pos.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }
      
    function error(err) {
        cy.warn(`ERROR(${err.code}): ${err.message}`);
    }

    it("Verify current position", function() {
        // Verify the geolocation is allowed        
        navigator.permissions.query({name:'geolocation'}).then(function(result) {
            // Will return ['granted', 'prompt', 'denied']
            assert.equal(result.state, 'granted')            
            navigator.geolocation.getCurrentPosition(success, error, options)
        })
        
        homePage.getForecastWeather().getDisplayedCity().then($element => {
            cy.log('Allocated location: ' + $element.text())            
        })
    })
})