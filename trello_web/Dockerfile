# @Author Ismael alves

# Estagio 1 - Será responsavel em construir a aplicação
FROM node:latest as node
WORKDIR /app
COPY package.json /app/
RUN npm install -g @angular/cli@8
RUN npm i
COPY ./ /app/
RUN npm run build

# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:alpine
LABEL maintainer="Ismael Alves cearaismael1997@gmail.com"
EXPOSE 80
COPY --from=node /app/dist/trello /usr/share/nginx/html