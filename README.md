# HelpDesk — Sistema de Chamados de TI

> **Projeto Integrador IV** — Sistema de gerenciamento de chamados de suporte técnico com painel administrativo, fluxo de status em tempo real e notificações via Socket TCP.

<p align="center">
  <img src="https://img.shields.io/badge/Java-Puro-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Deploy-Vercel%20%2B%20Fly.io-000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

---

## Sobre o Projeto

Sistema Help Desk corporativo que permite:

- **Clientes** abrirem e acompanharem chamados de suporte
- **Técnicos** receberem, atenderem e resolverem chamados
- **Administradores** gerenciarem usuários, categorias e visualizarem métricas

### Fluxo de Status dos Chamados

```
NEW → ASSIGNED → CLOSED
                 └→ UNRESOLVED
```

---

## Arquitetura

O sistema é dividido em **3 contêineres Docker** independentes:

```
┌─────────────────────────────────────────────────────────┐
│                    Cliente (Browser)                    │
│                   HTML / CSS / JS                       │
└──────────┬──────────────────────────────┬───────────────┘
           │ HTTP/REST (:8000)            │ TCP Socket (:5000)
           ▼                              ▼
┌─────────────────────┐    ┌─────────────────────────────┐
│  Contêiner 1: API   │    │  Contêiner 2: Socket Server │
│  (com.sun.httpserver)│    │  (java.net.ServerSocket)    │
│  CRUD + Auth         │    │  Tempo real + Notificações  │
└──────────┬──────────┘    └──────────────┬──────────────┘
           │ JDBC                          │ JDBC
           ▼                               ▼
┌─────────────────────────────────────────────────────────┐
│            Contêiner 3: PostgreSQL (:5432)              │
└─────────────────────────────────────────────────────────┘
```

> Documentação completa: [`docs/backend_architecture.md`](./docs/backend_architecture.md) · [`docs/database_modeling.md`](./docs/database_modeling.md)

---

## Stack Tecnológica

| Camada | Tecnologia |
|:---|:---|
| **Frontend** | HTML5, CSS3 (Vanilla), JavaScript (ES6+) |
| **Backend API** | Java Puro (`com.sun.net.httpserver.HttpServer`) |
| **Backend Socket** | Java Puro (`java.net.ServerSocket` + Threads) |
| **Banco de Dados** | PostgreSQL 15+ |
| **Conexão DB** | JDBC Nativo (sem ORM) |
| **Serialização JSON** | Gson 2.11 |
| **Containerização** | Docker + Docker Compose |
| **Deploy** | Vercel (front) · Fly.io (back) · Neon.tech (DB) |

---

## Estrutura do Projeto

```
Help-Desk-PI-IV/
├── frontend/
│   ├── index.html              # Dashboard do frontend
│   ├── login.html              # Tela de Login e Cadastro
│   ├── css/
│   │   ├── variables.css       # Design tokens e variáveis CSS
│   │   ├── base.css            # Reset e estilos globais
│   │   ├── layout.css          # Grid e estrutura de layout
│   │   ├── components.css      # Componentes da UI
│   │   ├── animations.css      # Transições e animações
│   │   └── login.css           # Estilos da tela de login
│   └── js/
│       ├── data.js             # Dados mockados e estrutura
│       ├── theme.js            # Alternância de tema (light/dark)
│       ├── router.js           # Roteamento SPA client-side
│       ├── components.js       # Componentes renderizados via JS
│       ├── auth.js             # Lógica de login/cadastro e requests API
│       └── app.js              # Inicialização da aplicação
├── backend-api/                # Contêiner 1: API REST
│   ├── Dockerfile
│   ├── lib/
│   │   ├── postgresql.jar      # Driver JDBC PostgreSQL 42.7.3
│   │   └── gson.jar            # Gson 2.11.0
│   └── src/                    # Código-fonte Java (a implementar)
├── backend-socket/             # Contêiner 2: Socket TCP
│   ├── Dockerfile
│   ├── lib/
│   │   ├── postgresql.jar
│   │   └── gson.jar
│   └── src/                    # Código-fonte Java (a implementar)
├── docs/
│   ├── backend_architecture.md # Documentação da arquitetura
│   └── database_modeling.md    # Modelagem e dicionário de dados
└── docker-compose.yml          # Orquestração local (a criar)
```

Basta abrir o `frontend/login.html` no navegador ou usar um servidor local:

```bash
cd frontend
npx -y serve .
```

---

## Deploy (Produção)

| Componente | Plataforma | URL |
|:---|:---|:---|
| **Frontend** | Vercel | `https://help-desk-pi-iv.vercel.app` |
| **API Principal** | Fly.io | `https://helpdesk-api.fly.dev` |
| **Socket Server** | Fly.io | `helpdesk-socket.fly.dev:5000` |
| **Banco de Dados** | Neon.tech | Connection string via painel |

---

## Banco de Dados

5 tabelas principais:

| Tabela | Finalidade |
|:---|:---|
| `users` | Usuários (CLIENT, SUPPORT, ADMIN) |
| `categories` | Categorias de chamados |
| `tickets` | Chamados de suporte |
| `ticket_timeline` | Histórico de eventos do chamado |
| `notifications` | Notificações do sistema |

> Dicionário de dados completo em [`docs/database_modeling.md`](./docs/database_modeling.md)

---

## Equipe

Projeto Integrador IV — Curso de Análise e Desenvolvimento de Sistemas

---

## Licença

Este projeto é de uso acadêmico.
