set versao=0.0.1

echo "<============ Iniciando o build da versao %versao% ==============>"
docker build -t trello:%versao% .
echo "<============ Iniciando o build da ultima versao ==============>"
docker build -t trello .
echo "<============ Build Finalizado ==============>"