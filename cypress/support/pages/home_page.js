import { DesktopHeader } from "../widgets/desktop_header"
import { ForecastWeather } from "../widgets/forecast_weather"

export class HomePage {
    desktopHeader = new DesktopHeader()
    forecastWeather = new ForecastWeather()

    getDesktopHeader() {
        return this.desktopHeader
    }

    getForecastWeather() {
        return this.forecastWeather
    }

    getCelciusConvertion() {
        return cy.get('div.switch-container div:nth-child(2)')
    }

    getFahrenheitConvertion() {
        return cy.get('div.switch-container div:nth-child(3)')
    }

    waitUntilPageLoaded() {
        cy.waitFor(cy.get('div.owm-loader-container svg').should('not.exist'))
    }

    convertTemperature() {             
        cy.wrap(this.forecastWeather.getTemperatureInfo()).then(currentTemp => {
            let convertedTemp =  this.forecastWeather.calculateConvertedTemperature(currentTemp)
            cy.log(`Converted tempurature: ${convertedTemp}`)

            if (currentTemp[1] == 'C') {               
                this.getFahrenheitConvertion().click()
            } else {                
                this.getCelciusConvertion().click()
            }
            this.waitUntilPageLoaded()
            
            cy.wrap(this.forecastWeather.getTemperatureInfo()).then($newTemp => {  
                assert.notEqual(currentTemp, $newTemp[0], "Temperature before & after convert are still the same")
                //assert.equal(convertedTemp, $newTemp[0], "Temperature is changed")
            })
        })
    }
}