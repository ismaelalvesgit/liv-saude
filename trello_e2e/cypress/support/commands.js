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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('CadastroCards', (item) => {
    // Criando o Cenario
    cy.get('#addCard').type(item.nome)
    cy.get("#addCardButton").click()
    // Submit Form
    cy.get('.swal2-confirm').click()
    cy.get('.swal2-confirm').click()
})

Cypress.Commands.add('CadastroTarefas', (item) => {
    cy.CadastroCards(item).then(() => {
        item.lista.forEach((itens, index) => {
            cy.get("#addLista0").type(itens)
            cy.get("#addListaButton0").click()
            // Submit Form
            cy.get('.swal2-confirm').click()
            cy.get('.swal2-confirm').click()
            // Verificando valores cadastrados
            cy.get(`#cdk-drop-list-0 > :nth-child(${index + 2}) > .justify-content-between > .lead`).should('contain.text', itens)
        })
    })
})