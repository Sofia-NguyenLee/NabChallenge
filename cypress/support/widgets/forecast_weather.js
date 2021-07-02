/// <reference types="cypress-xpath" />

import dayjs from "dayjs"

export class ForecastWeather {
    getDisplayedCity() {
        return cy.xpath("//div[@class='current-container mobile-padding']//h2")
    }

    getDisplayedDate() {
        return cy.xpath("//div[@class='current-container mobile-padding']//span[@class='orange-text']")
    }

    verifyDisplayedCity(city) {
        this.getDisplayedCity().should('have.text', city)
        return this
    }

    verifyForecastDate() {
        var isTomorrow = require('dayjs/plugin/isTomorrow')
        // It'll show forecast for tomorrow if it's over 11pm
        dayjs.extend(isTomorrow)
        let isTomorrowForecast = dayjs().add(2, 'hour').isTomorrow() 

        this.getDisplayedDate().should($span => {
            let forecastDate = $span.text().split(',')[1].trim()    
            if (isTomorrowForecast) {        
                assert.equal(forecastDate, dayjs().add(1, 'day').format('MMM DD'))            
            } else {
                assert.equal(forecastDate, dayjs().timezone("Australia/Sydney").format('MMM DD'))
            }
        })
        return this
    }
   
    verifyDateTimeByTimezone(cityTimezone) {        
        var utc = require("dayjs/plugin/utc")
        var timezone = require("dayjs/plugin/timezone")        
        dayjs.extend(timezone)
        dayjs.extend(utc)        
        let beforeRange = dayjs().tz(cityTimezone).add(-2, 'minute') .format('h:mma, MMM D')
        let afterRange = dayjs().tz(cityTimezone).add(2, 'minute').format('h:mma, MMM D')
        var isBetween = require('dayjs/plugin/isBetween')
        dayjs.extend(isBetween)
        this.getDisplayedDate().then($span => {
            cy.log(`UI datatime: ${$span.text()}, Expected: ${beforeRange}, After: ${afterRange}`)
            dayjs($span.text()).isBetween(beforeRange, afterRange)            
        })
        return this
    }

    getTemperatureInfo() {        
        return new Cypress.Promise((resolve) => { 
            cy.xpath("//div[@class='current-temp']//span[@class='heading']").should($span => {            
                let temperatureInfo = $span.text().split('°')  
                resolve(temperatureInfo)
            })
        })
    }
    
    verifyForecastTemperature() {
        this.getTemperatureInfo().then(temperatureInfo => {            
            assert.isNumber(parseInt(temperatureInfo[0]))
        })
        return this
    }

    calculateConvertedTemperature(temperatureInfo) {                                 
        let convertedTemperature = (temperatureInfo[1] == 'C')
                                ? this.celsiusToFahrenheit(temperatureInfo[0])
                                : this.fahrenheitToCelsius(temperatureInfo[0])                
        return convertedTemperature
    }

    celsiusToFahrenheit(temperature) {
        return Math.round((temperature * 9/5) + 32, 0)
    }

    fahrenheitToCelsius(temperature) {
        return Math.round((temperature - 32) * 5/9, 0)
    }
}