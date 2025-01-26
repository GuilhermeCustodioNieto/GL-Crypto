### **Sistema de Mercado de Criptomoedas**

---

# **Sistema de Mercado de Criptomoedas**

Este projeto é uma aplicação FullStack para compra e venda de criptomoedas. Ele permite aos usuários comprar, vender e depositar criptomoedas de forma simulada. A aplicação inclui uma API robusta no backend e uma interface amigável no frontend.

---

## **Arquitetura do Projeto**

A arquitetura segue o padrão **MVC (Model-View-Controller)** para o backend. 

### **Estrutura Geral**
```
gl-crypto/
  ├── backend/
  │   ├── app.js
  │   ├── config/
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │     ├── middlewares/
  │   ├── utils/
  │   └── .env
  │   └── swaggerOptions.js/
  │   └── Dockerfile.js/
  ├── frontend/
  │   ├── index.html
  │   ├── css/
  │   ├── imgs/
  │   ├── js/
  │     ├── consumo-api/
  │   ├── login/
  │   ├── usuario/
  │   ├── venda-compra/
  ├── extra/
  │   ├── queries/
  └── README.md
```

### **Backend: Detalhes**
- **`app.js`**: Configuração principal do servidor Express, middlewares globais, e inicialização.
- **Rotas (`routes/`)**: Define os endpoints da API para usuários, transações, controle de criptomoedas e gerenciamento de carteira.
- **Controladores (`controllers/`)**: Contêm a lógica de negócios, como validações e chamadas ao banco de dados.
- **Modelos (`models/`)**: Representam as tabelas no banco de dados MySQL e gerenciam as operações CRUD.
- **Configuração (`config/`)**: Configuração de conexão ao banco de dados.

### **Frontend: Detalhes**
- **JavaScript (`js/`)**: JavaScript para manipulação do DOM e o consumo da API.
- **Imagens e Ícones (`imgs/`)**: Imagens e ícones do site.
- **Estilos (`css/`)**: Arquivos CSS para estilização global e específica.
- **login (`login/`)**: Páginas referentes ao login e cadastro do usuário.
- **Usuário (`usuario/`)**: Páginas referentes as páginas do usuário.
- **Transações (`venda-compra/`)**: Páginas referentes as transações que o usuário pode realizar.

### **Extra: Detalhes**
- **Queries (`queries/`)**: Arquivos .sql para realizar consultas base para o projeto.

#### Imagens dos Diagramas
- Diagrama de Classes

<img src="Extra\class diagram.png" alt="Diagrama de Classes">

- Diagrama de Atividade

<img src="Extra\UML.png" alt="Diagrama de Atividade">

---

## **Funcionalidades**
### **Backend**
- Gerenciamento de usuários: Cadastro, login e autenticação JWT.
- Cadastro de moneys: Criar, listar, editar e excluir moedas reais e criptomoedas de forma separada.
- Gestão de transações: Comprar, depositar, realizar conversão de moedas, vender e ver histórico de criptomoedas.
- Gestão de carteira: Criar, editar e deletar carteira e moedas da carteira.

### **Frontend**
- Login e Cadastro de Usuários.
- Páginas do usuário: dados do usuário e histórico de transações.
- Transações:  vender, comprar e depositar moedas no site.

---

## **Instalação**

### **Clonar o Repositório**
```bash
git clone https://github.com/GuilhermeCustodioNieto/GL-Crypto.git
cd gl-crypto
```

### **Configuração do Backend**
1. Navegue para a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o arquivo `.env` com as variáveis de ambiente:
   ```env
DB_NAME=nome do seu banco de dados
DB_USER=nome do seu usuário do banco
DB_PASSWORD=sua senha
DB_HOST=seu host
DB_DIALECT=tipo do seu banco de dados
URL_CONVERSOR=sua url de API externa para conversão de moedas
API_KEY_CONVERSOR=a key da API
   ```
1. Inicie o servidor:
   ```bash
   npm run dev
   ```

---

## **Rotas da API**
**Autenticação**
- `POST /auth/user/login`: Login do usuário.
- `POST /auth/user/register`: Cadastro de novos usuários.

**User**
- `GET /users`: Lista todos os usuários.
- `GET /users/:id`: Procura um usuário através do id.
- `GET /users/getAllData/:id`: Entrega todos os dados do respectivo usuário.

**Moneys**
- `GET /moneys`: Lista todas as moedas.
- `GET /moneys/:id`: Procura uma moeda através do id.

**Cryptos**
- `GET /money/cryptos`: Lista todas as criptomoeda.
- `GET /money/cryptos/:id`: Procura uma criptomoeda através do id.
- `GET /money/cryptos/abbreviation/:id`: Procura uma criptomoeda através da sua abreviação.
- `POST /money/cryptos`: Registra uma nova criptomoeda.
- `PUT /money/cryptos/:id`: Atualiza uma criptomoeda.
- `DELETE /money/cryptos/:id`: Remove uma criptomoeda.

**RealMoney**
- `GET /money/realMoney`: Lista todas as moedas reais.
- `GET /money/realMoney/:id`: Procura uma moeda reail através do id.
- `GET /money/realMoney/abbreviation/:id`: Procura uma moeda real através da sua abreviação.
- `POST /money/realMoney`: Registra uma nova moeda real.
- `PUT /money/realMoney/:id`: Atualiza uma moeda real.
- `DELETE /money/realMoney/:id`: Remove uma moeda real.

**Crypto Wallet**
- `GET /crypto-wallet`: Lista todas as crypto wallets.
- `GET /crypto-wallet/:id`: Procura uma crypto wallet através do id.
- `POST /crypto-wallet`: Registra uma nova crypto wallet.
- `PUT /crypto-wallet/:id`: Atualiza uma crypto wallet.
- `DELETE /crypto-wallet/:id`: Remove uma crypto wallet.

**Wallet**
- `GET /wallets`: Lista todas as carteiras.
- `GET /wallets/:id`: Procura uma carteira através do id.
- `POST /wallets`: Registra uma nova carteira.
- `DELETE /wallets/:id`: Remove uma carteira.


**Transações**
- `POST /transation/buy`: Compra uma moeda.
- `POST /transation/deposit`: Deposita uma moeda na carteira.
- `POST /transation/sell`: Vende uma moeda da carteira.
- `POST /transation/convert`: Converte uma moeda para outra.
- `GET /transation/get-history`: Registra uma nova carteira.

---

## **Tecnologias Utilizadas**
### **Backend**
- Node.js
- Express
- MySQL
- JWT para autenticação
- Bcrypt para hash de senhas
- Swagger
- Docker

### **Frontend**
- HTML5
- CSS3
- Axios para consumo de APIs
- JavaScript

### Extras
- SQL
- Diagrama de Classes para modelas as entidades e suas interações
- Diagrama de Atividades para planejar fluxos de funcionalidades.

---

## **Contribuição**
Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do projeto.
2. Crie uma branch para a feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e envie um pull request.

---

## **Autor**
Desenvolvido por [Guilherme Custódio Nieto](https://www.linkedin.com/in/guilherme-cust%C3%B3dio-nieto/). 🚀
