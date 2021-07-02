/// <reference types="cypress-xpath" />

import { isUnique } from "../commands"
import { ForecastWeather } from "./forecast_weather"

export class SearchResult {    
    getSearchForm() {
        cy.get('form#search')
    }

    getQueryTextbox() {
        return cy.get('#search_str')
    }

    waitForAvailable() {
        cy.waitFor(this.getQueryTextbox().should('be.enabled'))
    }

    getSearchButton() {
        return this.getSearchForm().find('button[type=submit]')
    }

    getForecastResult() {
        return cy.get('div#forecast_list_ul')
    }
    
    getWeatherItems() {
        return this.getForecastResult().xpath('//tr')
    }

    getResultByIndex(index) {
        return this.getWeatherItems().eq(index).xpath('./td[2]/b[1]/a[1]')
    }

    searchWeather(qParam) {
        this.getQueryTextbox().clear().type(qParam)
        this.getSearchButton().click()
    }

    viewResultItem(index) {        
        this.getResultByIndex(index).click()
        return new ForecastWeather()
    }

    verifyDisplayedQParam(qParam) {
        this.getQueryTextbox().should('have.attr', 'value', qParam)
        return this
    }

    verifyUnhandledCases() {
        this.getForecastResult().children().should('have.length', 0)
    }

    verifySearchSpacesResult() {
        this.getForecastResult().children().should('not.be.empty')
    }

    verifyNotFoundResult() {
        this.getForecastResult().find('div[role=alert]').should('contain.text' , 'Not found')
    }

    verifyFoundResult() {
        // Verify the list location must have different geoloc
        cy.xpath('//*[@id="forecast_list_ul"]//tr/td[2]/p[2]/a')
                    .then(($els) => Cypress._.map($els, 'innerText'))
                    .then($allGeo => assert.isTrue(isUnique($allGeo)))   
        return this         
    }
}