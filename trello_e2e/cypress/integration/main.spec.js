/// <reference types="cypress" />


describe('Fluxo normal de verificação', () => {

  before(() => {
    cy.visit('http://localhost:4200/#/')
  })

  beforeEach(() => {
    cy.reload()
  })

  it('cadastro de Cards', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data)=>{
      data.forEach((item, index)=>{
        // Criando o Cenario
        cy.get('#addCard').type(item.nome)
        cy.get("#addCardButton").click()
        // Submit Form
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-confirm').click()
      })
    })
  })

  it.only('Editar de Cards', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data)=>{
      const item = data[0]
      cy.CadastroCards(item).then(()=>{
        cy.get('#cdk-drop-list-0 button[matTooltip="Editar Card"]').click()
        cy.get('#formCard0').clear()
        cy.get('#formCard0').type("Raquel")
        cy.get('#formCardButton0').click()
        // Submit Form
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-confirm').click()
        
        //
        cy.get('#cdk-drop-list-0 > .justify-content-between > .lead').should('contain.text', "Raquel")
      })
    })
  })

  // it('Remover Funcionarios', () => {
  //   cy.fixture('data.json').as('data')
  //   cy.get("@data").then((planos)=>{
  //     const item = planos[0]
  //     cy.Cadastro(item).then(()=>{
  //       cy.get('button[matTooltip="Remover"]').click()
  //       // Submit Form
  //       cy.get('.swal2-confirm').click()
  //       cy.get('.swal2-confirm').click()
  //       //Verificando se a tabela exite
  //       cy.get('mat-table').should('be.not.visible')
  //     })
  //   })
  // })
})
