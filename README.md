# Organiza Casamento 1.0 - Frontend

[![Linux](https://svgshare.com/i/Zhy.svg)](https://svgshare.com/i/Zhy.svg)
[![Windows](https://svgshare.com/i/ZhY.svg)](https://svgshare.com/i/ZhY.svg)

App que permitirá organizar casamentos para os noivos.


## 🚀 Sobre o desafio

O problema consiste em criar um sistema que permitirá que os noivos criem uma lista de convidados, com nome e e-mail, e
para cada convidado será possível informar se ele confirmou presença ou não. O sistema irá permitir que os noivos possam enviar RSVP para os convidados por Whatsapp ou Email, podendo também receber notificações das confirmações de presença.
Será possivel exportar a lista de convidados em PDF e uma planilha com dados do Evento cadastrado. O sistema tem como objetivo facilitar a organização de casamentos, permitindo que os noivos possam ter um controle de quantos convidados confirmaram presença, quantos não confirmaram, e quantos ainda não responderam.
Será possivel também adicionar artefatos do casamento, como fotos, vídeos, e músicas, que farão parte do casamento e podem ajudar a definir as preferências dos noivos.
No sistema existe um Checklist de atividades para os noivos com deadline e dicas.

## 🛠 Tecnologias utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Docker](https://www.docker.com/)
- [Cypress](https://www.cypress.io/)
- [TsLint](https://palantir.github.io/tslint/)
- [Firebase](https://firebase.google.com/)
- [Netlify](https://www.netlify.com/)

## 📝 Descrição

Este projeto foi desenvolvido com Angular Framework, utilizando:

- Angular CLI 6.2.9.
- NPM 6.14.17
- Node 14.20.0

## 🚀 Instalação

Para rodar a aplicação você deverá se certificar que está utilizando a versão 14.20.0 do Node e a versão 6.14.17 do NPM.
O CLI do Angular deve estar instalado na sua máquina.

### 1. Instale o Node e o NPM na sua máquina

Se estiver no Windows:

- Baixe e instale o NodeJS v14.20.0: https://nodejs.org/en/download/

Se estiver no Linux, rode os comandos abaixo:

```sh
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```

```sh
$ sudo apt install nodejs
```

### 2. Instale o Angular CLI

Agora, que temos o Node e o NPM instalados, instale o Angular CLI:

```sh
$ npm install -g @angular/cli
```

### 3. Instale as dependencias do projeto

Instale todas as dependencias do projeto:

```sh
$ npm install
```

Execute:

```sh
$ npm rebuild node-sass
```

## 📦 Execução

Para executar a aplicação, basta rodar o comando abaixo:

```sh
$ npm start
```

Finalmente, acesse http://localhost:4200 (frontend app).

OBS: Para rodar a aplicação, é necessário que o backend esteja rodando. Para isto, deve-se observar em src/app/shared/url/url.domain.ts o endereço do backend. Você pode alterar o endereço do backend para o endereço local, caso esteja rodando o backend localmente.

```ts
export const SERVER_URL = 'http://localhost:8000/api/';
// export const SERVER_URL = 'https://backendcotacoes.onrender.com/api/';
```

## Sobre os componentes base (Core).

Os componentes criados foram extendidos de um material de construção minha (pesquisa e estudo), que pode ser encontrado
no link abaixo:

[Guia de Desenvolvimento Baseado em Modelos](https://drive.google.com/file/d/1ZZz3DmO4nUPzsE9P3pCJr34AMUqEpKt1/view?usp=sharing)

Este itens pertencem ao Core da aplicação. O Core tem como objetivo abstrair a lógica de negócio da aplicação, e deixar
o código mais limpo e organizado.

## Testes

Todos os testes criados são testes de end-to-end (e2e), construídos com a biblioteca Cypress. Nestes testes temos a
verificação dos componentes presentes na tela de acordo com requisitos pré-definidos, além da verificação de fluxos de
navegação e de interação com o usuário.

Para rodar os testes implementados, é necessário que o BACKEND esteja ligado, para que as funcionalidades implementadas
possam requisitar a API corretamente. Para isto, basta executar o comando abaixo:

```bash
  npm run e2e
```

Uma suíte com os testes irá rodar. Você pode verificar o resultado no terminal. Os testes podem ser encontrados
em `frontend/cypress/e2e/cotacoes/`.

Se você tiver conhecimento de Cypress, é possível acessar a GUI do Cypress para visualizar os testes e rodá-los
individualmente. Para isto, basta executar o comando abaixo:

```bash
  npm run e2e-gui
```

## Qualidade de código

Para verificar a qualidade de código, foi utilizado o TSLint, que é um linter de código.

TSLint é uma ferramenta que pode ser usada para verificar o código TypeScript. Ele pode ser usado para verificar se o
código está em conformidade com um conjunto de regras definidas. Por exemplo, você pode usar TSLint para verificar se o
código está em conformidade com o guia de estilo do Airbnb.

Para rodar o TSLint, basta executar o comando abaixo:

```bash
  ng lint
```

Todos os erros mais comuns foram corrigidos com a utilização do TSLint:

- [x] Missing semicolon
- [x] Missing whitespace
- [x] Expected indentation of 2 spaces but found 4
- [x] Expected blank line between class members
- [x] Missing trailing comma
- [x] Missing space before function parentheses
- [x] Missing space before opening brace

## 📝 Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).

## 📝 Autor

<a href="#">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/7137962?v=4" width="100px;" alt=""/>
</a>
 <br />
 <sub><b>Caio Marinho</b></sub>
 <a href="#" title="Caio Marinho">🚀</a>

[![Linkedin Badge](https://img.shields.io/badge/-Caio%20Marinho-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/caiomarinho/)](https://www.linkedin.com/in/caiomarinho/)
[![Gmail Badge](https://img.shields.io/badge/-caiomarinho8@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caiomarinho8@gmail.com)](mailto:caiomarinho8@gmail.com)

Made with ❤️ by [Caio Marinho!](https://caiomarinho.tech/) 👋🏽 [Get in Touch!](https://www.linkedin.com/in/caiomarinho/)
