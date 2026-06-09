# KontorLeie Web-løsning

Node.js + Express + MariaDB + Docker

## Kom i gang

**Krav:** Docker og Docker Compose installert.

```bash
git clone https://github.com/preztel/ITK2004-Eksamen-2026.git
cd ITK2004-Eksamen-2026/web
cp .env.example .env
# Rediger .env med egne passord om ønskelig
docker compose up --build
```

Åpne [http://localhost:3000](http://localhost:3000)

## Testbrukere

| Brukernavn | Passord    | Bedrift      |
|------------|------------|--------------|
| bedrift1   | passord123 | Bedrift AS   |
| bedrift2   | passord123 | Konsulent AS |
| bedrift3   | passord123 | Design AS    |

## Funksjonalitet

- **Forside** (`/`) — offentlig markedsføringsside med tjenestebeskrivelse
- **Login** (`/login.html`) — innlogging med brukernavn og passord (bcrypt)
- **Kundeportal** (`/portal.html`) — viser VLAN, nettverk og dokumentasjon kun for innlogget bedrift

## API-endepunkter

| Metode | Sti            | Beskrivelse                              |
|--------|----------------|------------------------------------------|
| POST   | /login         | Logg inn (JSON: brukernavn, passord)     |
| POST   | /logout        | Logg ut                                  |
| GET    | /api/meg       | Innlogget brukers info (krever session)  |
| GET    | /api/docs      | Dokumentasjon for brukerens bedrift      |
| GET    | /api/nettverk  | Nettverksinfo for brukerens bedrift      |

## Databasedokumentasjon

Se [DATABASE.md](DATABASE.md) for tabellstruktur og ER-diagram.
