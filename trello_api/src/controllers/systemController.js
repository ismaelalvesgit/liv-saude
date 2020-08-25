//@Author ismael alves
import speedTest from 'speedtest-net'

module.exports = function(app){

    //metodo que verifica a saude do sistema
    app.get('/system/healthcheck', 
        async (req, resp, next) => {
            try {
                let data = {
                    process: process.pid,
                    uptime: process.uptime(),
                }
                const test = speedTest({maxTime: 5000})
                test.on('data', network => {
                    data.speed = network.speeds
                    data.client = network.client
                    resp.json(data)
                })   
            }  catch (error) {
                resp.status(503).json({nome: "system", mensagem: "serviço indisponivel :("})
            }
        }
    )

}