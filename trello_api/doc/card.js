//@Author ismael alves

/**
 * @api {get} /card Listage de Todos
 * @apiDescription 
 * Atenção e necessario passa um secret para ter acesso aos dados
 * @apiGroup Card
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} Authorization Secret de autorização do usuário autenticado
 * @apiHeaderExample {json} Header
*     {"Content-Type": "application/json"}
*     {"Authorization": "JWT xyz.abc.123.hgf"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
      "items": [
        {
          "id": 13,
          "nome": "Tarefa 02",
          "dataRegistro": "2020-08-25T00:25:57.777Z",
          "dataAtualizacao": "2020-08-25T00:25:57.777Z",
          "card": {
            "id": 14,
            "nome": "Ismael Alves",
            "dataRegistro": "2020-08-24T22:56:48.435Z",
            "dataAtualizacao": "2020-08-25T00:19:37.230Z"
          }
        },
        {
          "id": 14,
          "nome": "Tarefa 03",
          "dataRegistro": "2020-08-25T00:53:44.008Z",
          "dataAtualizacao": "2020-08-25T00:53:44.008Z",
          "card": {
            "id": 14,
            "nome": "Ismael Alves",
            "dataRegistro": "2020-08-24T22:56:48.435Z",
            "dataAtualizacao": "2020-08-25T00:19:37.230Z"
          }
        }
      ]
    }
 */

 /**
 * @api {get} /card/:id Get por ID
 * @apiDescription 
 * Atenção e necessario passa um secret para ter acesso aos dados
 * @apiGroup Card
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} Authorization Secret de autorização do usuário autenticado
 * @apiHeaderExample {json} Header
*     {"Content-Type": "application/json"}
*     {"Authorization": "JWT xyz.abc.123.hgf"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "_links": {
          "self": "/card/14",
          "all": "/card"
        },
        "id": 14,
        "nome": "Ismael Alves",
        "dataRegistro": "2020-08-24T22:56:48.435Z",
        "dataAtualizacao": "2020-08-25T00:19:37.230Z"
      }
 */

 /**
 * @api {delete} /card/:id Deletar Card
 * @apiDescription 
 * Atenção no metodo de deletar so e possivel deletar Card onde não possua lista atrelado a ela.
 * @apiGroup Card
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} Authorization Secret de autorização do usuário autenticado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 *     {"Authorization": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} id ID da card (requirido)
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 204 OK
 * @apiErrorExample {json} validações do Secret
 *    HTTP/1.1 401 Unauthorized
 *    "Secret não encontrado",
 *    "Secret inválido ou incorreto"
 * @apiErrorExample {json} Documento não encontrado
 *    HTTP/1.1 404 Not Found
 *    "documento não encontrado"
 * @apiErrorExample {json} Verificação de atrelamento
 *    HTTP/1.1 400 Bad Request
 *    {
 *        "nome": "contains",
 *        "mensagem": "Possui dados atrelado"
 *    }
 */

 /**
 * @api {put} /card/:id Atualizar Card
 * @apiDescription 
 * Atenção no metodo de atualização e relizado override do dado ou seja so sera alterado 
 * o que for mandado pela requisição. 
 * @apiGroup Card
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} Authorization Secrect de autorização do usuário autenticado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 *     {"Authorization": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} id ID da card (requirido)
 * @apiParam {String} nome Nome da card  (requirido)
 * @apiParamExample {json} Input
 *    {
 *      "nome": "jest.js",
 *      "id": 14,
 *    }
 * @apiSuccess {String} id ID da card
 * @apiSuccess {String} nome Nome da card 
 * @apiSuccess {String} dataRegistro Data de Registro da card 
 * @apiSuccess {String} dataAtualizacao Data de Atualização da card
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 14,
 *       "nome": "jest.js",
 *       "dataRegistro": "2019-12-23T15:51:28.362Z",
 *       "dataAtualizacao": "2019-12-23T15:51:28.362Z",
 *     }
 * @apiErrorExample {json} validações do token
 *    HTTP/1.1 401 Unauthorized
 *    "secret não encontrado",
 *    "secret inválido ou incorreto"
 * @apiErrorExample {json} Documento não encontrado
 *    HTTP/1.1 404 Not Found
 *    "documento não encontrado"
 * @apiErrorExample {json} Campos Incorretos ou inexistentes
 *    HTTP/1.1 400 Bad Request
 *    {
 *        "nome": "nome",
 *        "mensagem": "nome e requirido"
 *    }
 */

 /**
 * @api {post} /card Cadastro de Cards
 * @apiGroup Card
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} Authorization Secret de autorização do usuário autenticado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 *     {"Authorization": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} nome Nome da card (requirido)
 * @apiParamExample {json} Input
 *    {
 *      "nome": "node.js"
 *    }
 * @apiSuccess {String} id ID da card
 * @apiSuccess {String} nome Nome da card
 * @apiSuccess {String} dataRegistro Data de Registro da card
 * @apiSuccess {String} dataAtualizacao Data de Atualização da card
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 14,
 *       "nome": "node.js",
 *       "dataRegistro": "2019-12-23T15:51:28.362Z",
 *       "dataAtualizacao": "2019-12-23T15:51:28.362Z",
 *     }
 * @apiErrorExample {json} validações do token
 *    HTTP/1.1 401 Unauthorized
 *    "secret não encontrado",
 *    "secret inválido ou incorreto"
 * @apiErrorExample {json} Campos Incorretos ou inexistentes
 *    HTTP/1.1 400 Bad Request
 *    {
 *        "nome": "nome",
 *        "mensagem": "nome e requirido"
 *    }
 */