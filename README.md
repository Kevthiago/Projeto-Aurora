# 🧠 Projeto Aurora App — Backend (Spring Boot)

Este repositório contém o **backend oficial** do *Projeto Aurora*, um aplicativo mobile criado para auxiliar pessoas autistas e seus responsáveis através de:

* Gerenciamento de dependentes
* Calendário de atividades
* Botões de comunicação por áudio
* Registros automáticos de ações
* Guia de autorregulação
* Integração com **IA (ChatGPT)** para análises e recomendações personalizadas
* Ambiente seguro com **JWT Authentication**

---

# 📌 Tecnologias Principais

* **Java 17**
* **Spring Boot 3**
* Spring Web
* Spring Security (JWT)
* Spring Data JPA
* MariaDB
* Lombok
* Swagger (OpenAPI)
* Integração OpenAI (ChatGPT API)
* Docker & Docker Compose

---

# 📁 Estrutura do Projeto

```
src/
 └── main/
      ├── java/com/example/autismapp/
      │    ├── config/          # Configurações gerais e segurança
      │    ├── controller/      # Endpoints da API
      │    ├── dto/             # Objetos de entrada e saída
      │    ├── entity/          # Modelos JPA
      │    ├── exception/       # Handler global de erros
      │    ├── repository/      # Interfaces JPA
      │    ├── security/        # JWT Authentication
      │    ├── service/         # Lógica de negócio
      │    │     └── impl/      # Implementações dos serviços
      │    └── util/            # Utilitários (ex: JWT)
      └── resources/
           ├── application.properties
           └── static/ templates/
```

---

# 🔐 Autenticação e Autorização

O sistema utiliza **JWT (JSON Web Token)** para autenticação.
Endpoints públicos:

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/chatgpt/**`
* `/swagger-ui/**`
* `/v3/api-docs/**`

Todas as demais rotas exigem um token JWT válido:

```
Authorization: Bearer <token>
```

---

# 🧠 Integração com OpenAI (ChatGPT)

O backend possui uma integração com a API da OpenAI para:

* Gerar relatórios inteligentes sobre ações do dependente
* Gerar recomendações ao cuidador
* Ajudar no guia de autorregulação

A API Key deve ser configurada no:

```
application.properties
```

Ou via variável de ambiente:

```
OPENAI_API_KEY=suachaveaqui
```

---

# 🗄️ Banco de Dados

Utiliza **MariaDB**.

Credenciais padrão (docker-compose):

```
username: root  
password: changeit  
database: autismapp
```

Criação das tabelas via `spring.jpa.hibernate.ddl-auto=update`.

---

# 🐳 Executando com Docker

### 1. Build da aplicação

```
mvn clean package -DskipTests
```

### 2. Subindo containers

```
docker-compose up -d
```

A aplicação iniciará em:

```
http://localhost:8080
```

E o banco em:

```
localhost:3306
```

---

# 📘 Documentação da API (Swagger)

Disponível automaticamente em:

```
/swagger-ui/index.html
```

---

# 🧱 Estrutura das Entidades

* **Caregiver** — responsável do dependente
* **Dependent** — pessoa autista cadastrada
* **CalendarEvent** — eventos/rotinas
* **SoundButton** — botões com áudio para comunicação
* **ActionLog** — registro das ações realizadas
* **ResourceGuide** — guia de autorregulação

---

# 🧪 Testes

Inclui dependência do `spring-boot-starter-test` para testes unitários e de integração.

---

# 🚀 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch com sua feature
3. Abra um Pull Request
4. Aguarde revisão

---

# 👤 Autor

**David Neto**
Backend Developer – Spring Boot
Ambição em Full Stack e liderança técnica
