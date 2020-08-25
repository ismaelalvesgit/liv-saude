//@Author ismael alves

/**
 * @api {get} /system/healthcheck Analise da saúde da API
 * @apiGroup System
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiSuccessExample {json} Success
 *      HTTP/1.1 200 OK
        {
            process: 5440,
            uptime: 705.64,
            speed: {
                download: 73.492,
                upload: 40.84,
                originalDownload: 8093822,
                originalUpload: 4481974
            },
            client: {
                ip: "45.181.93.64",
                lat: -3.7196,
                lon: -38.5257,
                isp: "Unknown",
                isprating: 3.7,
                rating: 0,
                ispdlavg: 0,
                ispulavg: 0,
                country: "BR"
            }
        }
 * @apiErrorExample {json} Erro
 *    HTTP/1.1 503 Service Unavailable
 *    "pilha de possiveis problemas"
 */