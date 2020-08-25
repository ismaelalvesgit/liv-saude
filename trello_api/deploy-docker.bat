set versao=0.0.1

echo "<============ Iniciando o build da versao %versao% ==============>"
docker build -t trellor_api:%versao% .
echo "<============ Iniciando o build da ultima versao ==============>"
docker build -t trellor_api .
echo "<============ Enviando imagem na versao %versao% para o repositorio ==============>"
docker push trellor_api:%versao%
echo "<============ Enviando imagem na ultima versao para o repositorio ==============>"
docker push trellor_api
echo "<============ Deploy Finalizado ==============>"