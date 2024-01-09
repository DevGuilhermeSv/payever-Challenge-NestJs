<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição / Description
Se tratada de uma API com demonstração de diversos conseitos e ferramentas de programação.
Ela foi desenvolvida utilizando o Framework NestJs. 
Caso deseje, fique a vontade para clonar o repositorio e utilizar os códigos como bem desejar.  
Is an API with demonstration of several concepts and programming tools.
It was developed using the NestJs Framework.
If you wish, feel free to clone the repository and use the codes as you wish.

### Oque consiste a aplicação  / What consist the application
-  **Obter Usuario  / GET** - /api/user/{userId}  
    - [X]  Recuperar dados da api Reqres [https://reqres.in](https://reqres.in/api/users/{userId})
    - [X]  Retornar Usuario em JSON
-  **Criar novo usuario.  / POST** - /api/users
    - [X]  O novo usuario deve ser armazenado em banco de dados MongoDb  
    - [X]  Uma notificação deve ser enviada por email e RabittMQ
-  **Obter Avatar. / GET** - /api/user/{userId}/avatar
    - [X]    Salvar a imagem como arquivo 
    - [X]    Armazenar no Bando de Dados com o ID do usuario e o Hash da imagem
    - [X]    Retorna-la como representação Base64
    - [X]    As seguintes requisições devem retornar o arquivo previamente salvo em Base64  
-  **Deletar Avatar  / DELETE** - /api/user/{userId}/avatar
    - [X]  Remover o arquivo do sistema de arquivo
    - [X]  Remover entradas do banco de dados  
    
## Instalação / Installation

```bash
$ npm install
```
## Executando MongoDb e RabbitMQ / Running MongoDb and RabbitMQ

```bash
# Using docker-compose
$ docker compose up

```
Este comando vai subir os container do RabbitMQ e MongoDb. Estes ficam expostos para conexção local nas portas padrões.  
This command will up the rabbitMQ and MongoDb containers and expose them to local connections

## Executando a aplicação / Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Teste / Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Suporte / Support  
Qualquer ajuste e sugestão sera bem vindo! Abra uma Issue descrevendo o problema e uma branche a apartir da Main
com a atualização.  
Any adjuste will be wellcome! Open a Issue with the description of problem and a branch from Main whit the update suggestion.  

## Contatos / Stay in touch

- Author - [Guilherme Silva](https://github.com/DevGuilhermeSv)
- Website - [https://meuportfolio.fly.dev/](https://meuportfolio.fly.dev/)

## License

Nest is [MIT licensed](LICENSE).
