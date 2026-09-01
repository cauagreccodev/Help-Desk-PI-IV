"""
==========================================================
 PROJETO INTEGRADOR IV - SISTEMA DE HELP DESK
 Script de Criação de Tabelas no PostgreSQL
 Baseado em: database_modeling.md e backend_architecture.md
==========================================================
 Uso:
   python3 create_tables.py

 Requisitos:
   pip install psycopg2-binary

 Variáveis de ambiente (ou editar DB_CONFIG abaixo):
   DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
==========================================================
"""

import os
import sys

try:
    import psycopg2
except ImportError:
    print("❌ Módulo 'psycopg2' não encontrado.")
    print("   Instale com: pip install psycopg2-binary")
    sys.exit(1)


# ── Configuração de Conexão ──
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": os.getenv("DB_PORT", "5432"),
    "dbname": os.getenv("DB_NAME", "helpdesk"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASS", "rootpassword"),
}


# ── SQL de Criação das Tabelas ──

SQL_TRIGGER_FUNCTION = """
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
"""

SQL_CREATE_USERS = """
CREATE TABLE IF NOT EXISTS users (
    id            SERIAL       PRIMARY KEY,
    name          VARCHAR(150) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL CHECK (role IN ('CLIENT', 'SUPPORT', 'ADMIN')),
    department    VARCHAR(100),
    job_title     VARCHAR(100),
    avatar_url    VARCHAR(255),
    is_active     BOOLEAN      DEFAULT TRUE,
    created_at    TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP
);
"""

SQL_CREATE_CATEGORIES = """
CREATE TABLE IF NOT EXISTS categories (
    id          SERIAL       PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    icon        VARCHAR(50)  DEFAULT 'help-circle',
    description VARCHAR(255),
    is_active   BOOLEAN      DEFAULT TRUE,
    created_at  TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP
);
"""

SQL_CREATE_TICKETS = """
CREATE TABLE IF NOT EXISTS tickets (
    id          SERIAL       PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    description TEXT         NOT NULL,
    status      VARCHAR(20)  NOT NULL DEFAULT 'NEW'
                CHECK (status IN ('NEW', 'ASSIGNED', 'CLOSED', 'UNRESOLVED')),
    priority    VARCHAR(20)  NOT NULL DEFAULT 'MEDIUM'
                CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
    category_id INT          REFERENCES categories(id) ON DELETE SET NULL,
    client_id   INT          NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    support_id  INT          REFERENCES users(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP,
    closed_at   TIMESTAMPTZ
);
"""

SQL_CREATE_TICKET_TIMELINE = """
CREATE TABLE IF NOT EXISTS ticket_timeline (
    id         SERIAL      PRIMARY KEY,
    ticket_id  INT         NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    author_id  INT         NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    event_type VARCHAR(30) NOT NULL
               CHECK (event_type IN ('CREATION', 'ASSIGNMENT', 'STATUS_CHANGE', 'PRIORITY_CHANGE', 'COMMENT')),
    message    TEXT        NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
"""

SQL_CREATE_NOTIFICATIONS = """
CREATE TABLE IF NOT EXISTS notifications (
    id         SERIAL       PRIMARY KEY,
    user_id    INT          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ticket_id  INT          REFERENCES tickets(id) ON DELETE CASCADE,
    type       VARCHAR(50)  NOT NULL,
    title      VARCHAR(150) NOT NULL,
    message    TEXT         NOT NULL,
    is_read    BOOLEAN      DEFAULT FALSE,
    created_at TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP
);
"""

# ── Índices ──

SQL_CREATE_INDEXES = """
CREATE INDEX IF NOT EXISTS idx_users_email            ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role             ON users(role);

CREATE INDEX IF NOT EXISTS idx_tickets_status         ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority       ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_client_id      ON tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_tickets_support_id     ON tickets(support_id);
CREATE INDEX IF NOT EXISTS idx_tickets_category_id    ON tickets(category_id);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at     ON tickets(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_timeline_ticket_id     ON ticket_timeline(ticket_id);
CREATE INDEX IF NOT EXISTS idx_timeline_created_at    ON ticket_timeline(created_at ASC);

CREATE INDEX IF NOT EXISTS idx_notifications_user     ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created  ON notifications(created_at DESC);
"""

# ── Triggers ──

SQL_CREATE_TRIGGERS = """
DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_tickets_updated_at ON tickets;
CREATE TRIGGER trg_tickets_updated_at
    BEFORE UPDATE ON tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
"""


# ── Ordem de execução ──

STEPS = [
    ("Função trigger updated_at", SQL_TRIGGER_FUNCTION),
    ("Tabela: users",             SQL_CREATE_USERS),
    ("Tabela: categories",        SQL_CREATE_CATEGORIES),
    ("Tabela: tickets",           SQL_CREATE_TICKETS),
    ("Tabela: ticket_timeline",   SQL_CREATE_TICKET_TIMELINE),
    ("Tabela: notifications",     SQL_CREATE_NOTIFICATIONS),
    ("Índices",                   SQL_CREATE_INDEXES),
    ("Triggers",                  SQL_CREATE_TRIGGERS),
]


def main():
    print("=" * 55)
    print("  HELP DESK PI IV — Criação de Tabelas (PostgreSQL)")
    print("=" * 55)
    print(f"\n  Host:   {DB_CONFIG['host']}:{DB_CONFIG['port']}")
    print(f"  Banco:  {DB_CONFIG['dbname']}")
    print(f"  User:   {DB_CONFIG['user']}")
    print()

    try:
        conn = psycopg2.connect(**DB_CONFIG)
        conn.autocommit = False
        cursor = conn.cursor()
        print("✅ Conexão com o banco estabelecida.\n")
    except psycopg2.OperationalError as e:
        print(f"❌ Erro ao conectar no banco de dados:\n   {e}")
        sys.exit(1)

    try:
        for step_name, sql in STEPS:
            print(f"  ▸ {step_name}...", end=" ")
            cursor.execute(sql)
            print("OK ✓")

        conn.commit()
        print("\n" + "=" * 55)
        print("  ✅ Todas as 5 tabelas criadas com sucesso!")
        print("=" * 55)
        print("\n  Tabelas: users, categories, tickets,")
        print("           ticket_timeline, notifications")
        print(f"\n  Fluxo de status: NEW → ASSIGNED → CLOSED")
        print(f"                                    └→ UNRESOLVED")
        print()

    except Exception as e:
        conn.rollback()
        print(f"\n\n❌ Erro durante a criação das tabelas:\n   {e}")
        sys.exit(1)

    finally:
        cursor.close()
        conn.close()
        print("  Conexão encerrada.")


if __name__ == "__main__":
    main()
