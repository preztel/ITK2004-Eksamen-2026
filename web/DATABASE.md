# Databasedokumentasjon

**Database:** MariaDB 11  
**Kjøres via:** Docker Compose

## Tabeller

### bedrifter
| Kolonne  | Type         | Beskrivelse                    |
|----------|--------------|-------------------------------|
| id       | INT (PK)     | Auto-increment primærnøkkel   |
| navn     | VARCHAR(100) | Bedriftens navn               |
| vlan     | INT          | VLAN-nummer (10, 20, 30 osv.) |
| ip_nett  | VARCHAR(20)  | Nettverksadresse (CIDR)       |
| gateway  | VARCHAR(20)  | Standard gateway              |

### brukere
| Kolonne      | Type         | Beskrivelse                        |
|--------------|--------------|------------------------------------|
| id           | INT (PK)     | Auto-increment primærnøkkel        |
| brukernavn   | VARCHAR(50)  | Unikt brukernavn                   |
| passord_hash | VARCHAR(255) | bcrypt-hash (cost 10)              |
| bedrift_id   | INT (FK)     | Referanse til bedrifter.id         |

### dokumentasjon
| Kolonne    | Type         | Beskrivelse                        |
|------------|--------------|------------------------------------|
| id         | INT (PK)     | Auto-increment primærnøkkel        |
| bedrift_id | INT (FK)     | Referanse til bedrifter.id         |
| tittel     | VARCHAR(200) | Dokumenttittel                     |
| innhold    | TEXT         | Innhold (plain text)               |
| opprettet  | TIMESTAMP    | Automatisk satt ved INSERT         |

## Relasjoner

```
bedrifter (1) ──< brukere (mange)
bedrifter (1) ──< dokumentasjon (mange)
```

## Tilkobling

Miljøvariabler leses fra `.env` (aldri commit denne filen):

| Variabel      | Beskrivelse            |
|---------------|------------------------|
| DB_HOST       | Hostname (db i Docker) |
| DB_USER       | Databasebruker         |
| DB_PASSWORD   | Passord                |
| DB_NAME       | Databasenavn           |
| SESSION_SECRET| Hemmelig nøkkel        |

Se `.env.example` for mal.

## Starte databasen

```bash
docker compose up db -d
```

## Tilbakestille data (slett alle volumer)

```bash
docker compose down -v
docker compose up --build -d
```
