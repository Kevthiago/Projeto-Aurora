# 🧩 Projeto Aurora — Assistência digital para Neurodivergentes não verbais com foco em auxílio à comunicação

![Java](https://img.shields.io/badge/Java-17-orange?style=flat&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-green?style=flat&logo=spring)
![React Native](https://img.shields.io/badge/React_Native-v0.70+-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Expo](https://img.shields.io/badge/Expo-Go-black?style=flat&logo=expo)

Este repositório contém o código-fonte completo do *Projeto Aurora* (Usina de Projetos VI), uma solução híbrida composta por uma API Backend robusta e um Aplicativo Mobile focado em acessibilidade para pessoas com TEA (Transtorno do Espectro Autista).

---

## 🎯 Visão Geral da Solução

O sistema é dividido em dois módulos principais, organizados nas seguintes pastas:

1.  **`main/` (Backend):** API RESTful desenvolvida em Java/Spring Boot. Responsável pela lógica de negócios, banco de dados, autenticação e integração com IA.
2.  **`frontend/` (Mobile):** Aplicativo mobile desenvolvido em React Native/Expo. Interface gamificada para o dependente e painel de gestão para o cuidador.

---

## 🛠️ Tecnologias Utilizadas

### ☕ Backend (`/main`)
* **Java 21** & **Spring Boot 3**
* **MariaDB/MySQL** (Banco de Dados)
* **Spring Security + JWT** (Autenticação)
* **OpenAI API** (Inteligência Artificial)
* **Docker** (Containerização)

### 📱 Frontend (`/frontend`)
* **React Native** (Framework UI)
* **TypeScript** (Tipagem estática)
* **Expo** (Plataforma de desenvolvimento)
* **Axios** (Cliente HTTP para conectar com o Backend)

---

## 🚀 Como Executar

Como o projeto possui duas partes distintas, é necessário rodá-las em terminais separados.

### 1️⃣ Pré-requisitos
* **Node.js** & **npm/yarn**
* **Java JDK 17+** & **Maven**
* **Docker** (Recomendado para subir o Banco de Dados)
* Celular com o app **Expo Go** instalado (ou emulador Android/iOS)

### 2️⃣ Rodando o Backend (API)

1.  Acesse a pasta do backend:
    ```bash
    cd main
    ```

2.  Suba o banco de dados (certifique-se de estar na raiz onde está o `docker-compose.yml` ou ajuste o comando):
    ```bash
    # Se o docker-compose estiver na raiz do projeto:
    cd ..
    docker-compose up -d
    cd main
    ```

3.  Instale as dependências e inicie o servidor Spring Boot:
    ```bash
    mvn spring-boot:run
    ```
    *A API ficará disponível em: `http://localhost:8080`*

### 3️⃣ Rodando o Frontend (App)

1.  Abra um novo terminal e acesse a pasta do frontend:
    ```bash
    cd frontend
    ```

2.  Instale as dependências do projeto:
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  Inicie o servidor do Expo:
    ```bash
    npx expo start
    ```

4.  Escaneie o **QR Code** exibido no terminal com o app *Expo Go* no seu celular (Android/iOS).

---

## ⚙️ Configuração de Variáveis

### Backend (`main/src/main/resources/application.properties`)
Certifique-se de configurar a conexão com o banco e a chave da OpenAI:

```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/autismapp
openai.api.key=${OPENAI_API_KEY}
```

Frontend (frontend/src/services/api.ts)
Para o App conseguir "conversar" com o Backend rodando no seu computador, você precisa apontar para o IP da sua máquina (não use localhost no mobile).

Edite o arquivo de configuração da API:

```
// Substitua pelo IP da sua máquina (ex: 192.168.0.15)
const API_URL = "[http://192.168.1.15:8080/api](http://192.168.1.15:8080/api)";

export default API_URL;
```

## 👥 Autores

### 🚀 Equipe Usina VI - Projeto Aurora

Este projeto foi desenvolvido com dedicação pelos seguintes integrantes:

* **Ana Cristina**
* **David Neto** — *Backend & Integração* 🛠️
* **Diana da Silva**
* **Gabriel Koch**
* **Kevin Thiago** — *Front & Integração* 📱
* **Otávio Silva**
* **Richard Luiz** — *Front & Integração* 📱

---
*🎓 Desenvolvido na Newton Paiva — 2025*
