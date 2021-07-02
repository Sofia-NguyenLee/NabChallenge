// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export function buildQueryParam(data) {
    cy.log(data)
    let q = data.name
    if (data.state !== undefined && data.state !== "") {
        q += `, ${data.state}`
    }
    if (data.country !== undefined && data.country !== "") {
        q += `, ${data.country}`
    }
    return q
}

export function isUnique(checkingArr) {
  assert.isArray(checkingArr)

  cy.log(`Check array: ${checkingArr}`)
  const seenValues = {}
  
  for (let i = 0; i < checkingArr.length; i++) {
    // we already saw this element in the array
    if (seenValues[checkingArr[i]]) {
      return false
    } else {
      seenValues[checkingArr[i]] = true
    }
  }
  
  return true
}