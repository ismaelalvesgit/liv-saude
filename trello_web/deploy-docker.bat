set versao=0.0.1

echo "<============ Iniciando o build da versao %versao% ==============>"
docker build -t trello:%versao% .
echo "<============ Iniciando o build da ultima versao ==============>"
docker build -t trello .
echo "<============ Enviando imagem na versao %versao% para o repositorio ==============>"
docker push trello:%versao%
echo "<============ Enviando imagem na ultima versao para o repositorio ==============>"
docker push trello
echo "<============ Deploy Finalizado ==============>"