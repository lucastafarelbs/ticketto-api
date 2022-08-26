#ticketto
---
## Api para o app ticketto
### Tecnologias:
- Nodejs
- Fastify

### Como executar:
**Solicite acesso ao board do projeto no trello**
- https://trello.com/b/fShfEcoK/ticketto-app
- .env: coluna infra-dev
- Com docker
  - docker-compose: coluna infra-dev
  - docker-compose up
- Node nativo
  - npm i && npm run dev


### Para testar:
- localhost:3550/
  - Deve exibir uma mensagem de que tudo está ok.
- Arquivo insomnia.json no trello
  - Criar usuário
  - Efetuar login
  - criar variável de ambiente "server" e colocar o endereço local:
    - localhost:3550
  - criar variável de ambiente "token" e colocar o token obtido no login

### Para executar o banco localmente:
  - Arquivo creates.sql e seed.sql dentro do diretório "db" no fonte


