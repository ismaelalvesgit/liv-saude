/// <reference types="cypress" />

before(() => {
  cy.visit('http://localhost:4200/#/')
})

beforeEach(() => {
  cy.reload()
  cy.task('query', {
    sql: 'DELETE FROM "lista"'
  })
  cy.task('query', {
    sql: 'DELETE FROM "card"'
  })
})

describe('Fluxo normal de tratamento de erros', () => {

  it('Verificar Erros do Campo de Cadastro de Cards', ()=>{
    cy.get('#addCard').type('asdas')
    cy.get('#addCard').clear()
    cy.get("#addCardButton").click()
    cy.get('#addCardError').should('contain.text', 'Obrigatório')
  })

  it('Verificar Erros do Campo de Editar de Cards', ()=>{
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      const item = data[0]
      cy.CadastroCards(item).then(() => {
        cy.get('#cdk-drop-list-0 button[matTooltip="Editar Card"]').click()
        cy.get('#formCard0').clear()
        cy.get('#formCard0').type("Raquel")
        cy.get('#formCard0').clear()
        cy.get('#formCardButton0').click()
        cy.get('#formCardError0').should('contain.text', 'Obrigatório')
      })
    })
  })

  it('Verificar Erros do Campo de Cadastro de Tarefas', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      const item = data[0]
      cy.CadastroCards(item).then(() => {
        item.lista.forEach((itens, index) => {
          cy.get("#addLista0").type(itens)
          cy.get("#addLista0").clear()
          cy.get("#addListaButton0").click()
          cy.get(`#addListaError${index+2}`).should('contain.text', 'Obrigatório')
        })
      })
    })
  })

  it('Verificar Erros do Campo de Editar Tarefas', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      const item = data[0]
      let edit = ["Tarefa 04", "Tarefa 05"]
      cy.CadastroTarefas(item).then(() => {
        item.lista.forEach((itens, index) => {
          cy.get(`#cdk-drop-list-0 > :nth-child(${index + 2}) button[matTooltip="Editar Lista"]`).click()
          cy.get(`#formLista${index}`).clear()
          cy.get(`#formLista${index}`).type(edit[index])
          cy.get(`#formLista${index}`).clear()
          cy.get(`#formListaButton${index}`).click()
          cy.get(`#formListaError${index}`).should('contain.text', 'Obrigatório')
        })
      })
    })
  })

  it('Deletar Card com Tarefas já Cadastradas', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      const item = data[0]
      cy.CadastroCards(item).then(() => {
        // Criando Cenário
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
      cy.get('#cdk-drop-list-0 button[matTooltip="Remover Card"]').click()
      // Verificando 
      cy.get('#swal2-content').should('contain.text', 'Ops! você precisa retirar as tarefas do card antes :)')
      cy.get('.swal2-confirm').click()
    })
  })

})

describe('Fluxo normal de verificação', () => {

  it('cadastro de Cards', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      data.forEach((item, index) => {
        // Criando o Cenario
        cy.get('#addCard').type(item.nome)
        cy.get("#addCardButton").click()
        // Submit Form
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-confirm').click()
        // Verificando valores cadastrados
        cy.get(`#cdk-drop-list-${index} > .justify-content-between > .lead`).should('contain.text', item.nome)
      })
    })
  })

  it('Editar de Cards', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      const item = data[0]
      cy.CadastroCards(item).then(() => {
        cy.get('#cdk-drop-list-0 button[matTooltip="Editar Card"]').click()
        cy.get('#formCard0').clear()
        cy.get('#formCard0').type("Raquel")
        cy.get('#formCardButton0').click()
        // Submit Form
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-confirm').click()
        // Verificando valores cadastrados
        cy.get('#cdk-drop-list-0 > .justify-content-between > .lead').should('contain.text', "Raquel")
      })
    })
  })

  it('Deletar o Cards', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      const item = data[0]
      cy.CadastroCards(item).then(() => {
        cy.get('#cdk-drop-list-0 button[matTooltip="Remover Card"]').click()
        // Submit Form
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-confirm').click()
        cy.get('body .card').should(($e) => {
          expect($e).to.have.length(1)
        })
      })
    })
  })

  it('Cadastro de tarefas', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      const item = data[0]
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
  })

  it('Editar tarefas', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      const item = data[0]
      let edit = ["Tarefa 04", "Tarefa 05"]
      cy.CadastroTarefas(item).then(() => {
        item.lista.forEach((itens, index) => {
          cy.get(`#cdk-drop-list-0 > :nth-child(${index + 2}) button[matTooltip="Editar Lista"]`).click()
          cy.get(`#formLista${index}`).clear()
          cy.get(`#formLista${index}`).type(edit[index])
          cy.get(`#formListaButton${index}`).click()
          // Submit Form
          cy.get('.swal2-confirm').click()
          cy.get('.swal2-confirm').click()
          // Verificando valores cadastrados
          cy.get(`#cdk-drop-list-0 > :nth-child(${index + 2}) > .justify-content-between > .lead`).should('contain.text', edit[index])
        })
      })
    })
  })

  it('Remover tarefas', () => {
    cy.fixture('data.json').as('data')
    cy.get("@data").then((data) => {
      const item = data[0]
      cy.CadastroTarefas(item).then(() => {
        item.lista.forEach((itens, index) => {
          cy.get(`#cdk-drop-list-0 > :nth-child(2) button[matTooltip="Remover Lista"]`).click()
          // Submit Form
          cy.get('.swal2-confirm').click()
          cy.get('.swal2-confirm').click()
        })
        // Verificando Card
        cy.get('#cdk-drop-list-0 > button[matTooltip="Remover Lista"]').should(($e) => {
          expect($e).to.have.length(0)
        })
      })
    })
  })

})
