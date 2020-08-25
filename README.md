# Projeto do Trello

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) version 8.3.26, [Express.js](https://expressjs.com/pt-br/) versão 4.17.1, [Postgres](https://www.postgresql.org/) versão 9.6.

## Development server

# Angular
Rode `ng serve` para pode acessar o servidor de desenvolvimento. Navegar para `http://localhost:4200/#`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.
# Express.js
Rode `npm run dev` no cmd para rodar o servidor dev. Navege para `http://localhost:3000`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.
# Cypress.js
Rode `npm run cypress:open` no cmd para iniciar o painel de testes.

## Docker

Rode `docker-compose -d up --build` para gerar o build de todo o ambiente do projeto.

## Teste

[husky](https://www.npmjs.com/package/husky) versão 3.1.0
para auto teste quando o projeto for subido para o repositorio do git, por motivos de melhor execução dos teste na parte de selecionar drives e etc decedi usar [cypress.js](https://www.cypress.io/) 
pois ele vai automaticamente pegar o drive correto para o navegador que instalado no SO de quem vai executar.

# Importante
Não atualizar nenhuma lib pois não estou usando a ultima versão do angula a atualização de alguma lib deste projeto pode levar a falha em sua execução, para que seja possivel executar os teste devera
esta rodando no SO este projeto.

# Banco de Dados

nome do banco deve ser trello estou usando [Typeorm.js](https://typeorm.io/) para gerenciamento de querys do banco estou deixando tambem um backup localizado em `./backup`

## Mais Ajuda

Deixei outros `README.md` nas pastas dos prejeto com maior detalhamento do projeto respectivo.


![App UI](/app.png)
