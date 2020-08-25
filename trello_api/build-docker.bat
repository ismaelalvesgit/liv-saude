set versao=0.0.1

echo "<============ Iniciando o build da versao %versao% ==============>"
docker build -t trellor_api:%versao% .
echo "<============ Iniciando o build da ultima versao ==============>"
docker build -t trellor_api .
echo "<============ Build Finalizado ==============>"