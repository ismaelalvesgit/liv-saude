# Trello Api

Este projeto foi gerado com [Express.js](https://expressjs.com/pt-br/) versão 4.17.1.

## Development server

Rode `npm run dev` no cmd para rodar o servidor dev. Navege para `http://localhost:3000`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## Start in Server

Rode `npm start` no cmd para rodar o servidor de prod Navege para `http://localhost:3000`

## Build Docker

Rode `./deploy-docker.sh` para SO linux ou `./deploy-docker.bat` para SO windos, esses arquivos vão gerar um nova imagem docker do projeto e mandalo para o repositorio configurado,
o arquivo de configuração da imagem está  localizado em `Dockerfile`.

## Developer Debug

Debug pelo vs code use a tecla `F5` copie e cole no `launch.json` as configurações abaixo.
```json
{
    "type": "node",
    "request": "launch",
    "protocol": "inspector",
    "name": "ES6 Debugger",
    "program": "${workspaceFolder}/index.js",
    "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/babel-node"
}
```

## Testes

Este projeto foi projeto com base no desenvolvimento [TDD](https://www.vector.com/int/en/lp/us/test-driven-development/?gclid=Cj0KCQiA_rfvBRCPARIsANlV66Nlrg_ef3hoOGlt4ZVr_Uzm-ZRGHjMYMFNZBa_NpIVgQy2XF9IAJY4aAnN1EALw_wcB) 
foram utiladas as libs [jest](https://jestjs.io/docs/en/getting-started) versão 24.9.0 e 
[supertest](https://www.npmjs.com/package/supertest) versão 4.0.2, [husky](https://www.npmjs.com/package/husky) versão 3.1.0
para auto teste quando o projeto for subido para o repositorio do git.

## Development TDD

Para executar os testes automatizados rode `npm test` para iniciar o test criados no diretorio `test/`
Caso queria entrar no modo de desenvolvimento seguro rode `npm run secure-mode`

## Logs

O projeto foi configurado para gerar e armazena logs de acesso e de erros organizados por dia
os logs estão localizados em `logs/`, tambem sera enviado um email para o administrador com
o id da requisição e o erro gerado.

## DevOps

O projeto foi configurado para fazer [CICD](https://medium.com/@nirespire/what-is-cicd-concepts-in-continuous-integration-and-deployment-4fe3f6625007) integrado com
[Jenkinis](https://www.jenkins.io/) arquivo de configuração localizado em `Jenkinisfile`.

## Documentação

Foi criada uma documentação do projeto usando [apidoc](https://apidocjs.com/#getting-started)
os arquivos da documentação estão localizados em `doc/` pra gerar um novo aterfato de documentação
rode o comando `npm run doc` depois acesse a url `http://localhost:3000/documentacao`

## Extra

# Dependencias do projeto

O projeto necessita que o SO onde o projeto esteja rodando contenha as ferramentas [nodejs](https://nodejs.org/en/), [snyk](https://snyk.io/)

# Healthcheck

Foi criado um serviço de analise de saúde do sistema analizando a conexão com o banco de dados e teste em network
o serviço foi feito para ser executado em cada 12:00 HS de funcionamento do sistema, caso queira executalo manualmente
navege para `http://localhost:3000/system/healthcheck`

# Performace

No projeto foi configurado [memory-cache](https://www.npmjs.com/package/memory-cache) por padrão cache expira em 20s, foi criado tambem
politicas de [Throttling](https://www.progress.com/blogs/how-to-rate-limit-an-api-query-throttling-made-easy) então por padrão um endereço IP 
dentro de um periodo de 20(vinte) segundos podera somente fazer 1000 requisições na aplicação


# Variaveis de ambiente

O projeto foi pre-configurado com algumas variaveis de ambiente que está localizado em `config/environments.js`.

- SERVER_URL = '(STRING) Url da API exemplo `http://localhost:3000` ou `http://exemple.com/api` obs sem o barra no final'
- SERVER_PORT = '(NUMBER) Porta da API exemplo `3000` ou `8080` obs por padrao usará porta 3000'
- SERVER_SSL = '(ANY) Caso essa variavel esteja presente no ambiente, A API por padrão usará o [protocolo](https://www.opservices.com.br/protocolos-de-rede/) [HTTPS](https://www.secnet.com.br/clientes/knowledgebase/47/O-que-e-HTTPS.html) exemplo `https://localhost:3000`'
- DB_HOST = '(STRING) Url do banco de dados exemplo `127.0.0.1`'
- DB_PORT = '(NUMBER) Porta do banco de dados exemplo `5432` ou `27018` obs por padrao usará porta 5432'
- DB_USER = '(STRING) Usuário do do banco de dados exemplo `root` obs por padrao usará o usuário postgres'
- DB_PASS = '(STRING) Senha da base de dados'
- DB_DATABASE = '(STRING) Nome da base de dados'
- SERVER_THROTTLING = '(BOOL) por padrão habilitado para implatantar politicas de throttling na api'
- API_SECRET = '(STRING) Chave de criptografia'
- CERT = '(STRING) Caminho do certificado SSL. exemplo `./ssl/cert.pem`'
- PRIVKEY  = '(STRING) Caminho do private key do certificado SSL. exemplo `./ssl/privkey.pem`'