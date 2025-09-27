## 👨‍💻 Desenvolvedor
**Luiz Amorim** - [GitHub](https://github.com/luizamorim2)

# API - Lista de Compras Aleatórias com Catálogo

![Status](https://img.shields.io/badge/status-concluído-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-22.x-blue)
![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey)
![Sequelize](https://img.shields.io/badge/ORM-Sequelize-blue)

---

## 🚀 Demo ao Vivo

A API está implantada em um servidor na AWS e pode ser acessada através do seguinte endpoint base:

**URL Base:** `https://luizext.online:8443`

---

## 📝 Sobre o Projeto

Este projeto é uma API RESTful desenvolvida como parte de um desafio técnico. A API gerencia um catálogo de itens e uma lista de compras, onde cada nova compra é associada a um usuário aleatório obtido da API pública do GitHub.

O objetivo foi construir uma aplicação, seguindo as melhores práticas de arquitetura de software, validação de dados e tratamento de erros.

### ✨ Funcionalidades Principais

* **Gerenciamento de Itens:** CRUD completo para os itens do catálogo.
* **Registro de Compras:** Criação de registros de compra com validação de estoque.
* **Integração Externa:** Consumo da API do GitHub para obter compradores aleatórios.
* **Validação Robusta:** Validação de schemas de entrada com **Zod**.
* **Tratamento de Erros:** Middleware global para tratamento de erros centralizado.
* **Banco de Dados:** **SQLite** com migrations gerenciadas pelo **Sequelize**.

---

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express.js
* **Banco de Dados:** SQLite
* **ORM:** Sequelize
* **Validação:** Zod
* **Variáveis de Ambiente:** Dotenv

---

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar a aplicação no seu ambiente de desenvolvimento.

### Pré-requisitos

* Node.js (v18 ou superior)
* npm ou Yarn

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/luizamorim2/montree-api.git](https://github.com/luizamorim2/montree-api.git)
    cd montree-api
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto, baseado no `.env.example` 
    ```
    PORT=3000
    ```

4.  **Execute as migrations do banco de dados:**
    Este comando criará o arquivo do banco de dados SQLite e as tabelas necessárias.
    ```bash
    npx sequelize-cli db:migrate
    ```

5.  **Inicie a aplicação:**
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3000`.

## 📋 Exemplos de Uso dos Endpoints

### Verificar status da api
```bash
GET /status
```

### Criar um Item
```bash
POST /itens
Content-Type: application/json

{
  "nome": "Chocolate",
  "preco": 350,
  "qtd_atual": 10
}
```

### Listar Itens
```bash
GET /itens
```

### Criar uma Compra
```bash
POST /compras
Content-Type: application/json

{
  "item_id": 1
}
```
### Listar Compras
```bash
GET /compras
```
