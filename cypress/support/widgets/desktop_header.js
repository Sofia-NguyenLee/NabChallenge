import { SearchResult } from "./search_result"

export class DesktopHeader {
    getQueryTextbox() {
        return cy.get('div#desktop-menu').find('form[role=search] input[name=q]')        
    }    

    waitForAvailable() {
        cy.waitFor(this.getQueryTextbox().should('be.enabled'))
    }

    searchWeather(qParam) {
        this.getQueryTextbox().clear().type(qParam).type('{enter}')
        return new SearchResult()
    }
}