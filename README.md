# ITK2004 Eksamen 2026 — Kontorutleie IT-løsning

**Elev:** Elias Aarflot Elvsaas
**Fagkode:** ITK2004 — VG2 Informasjonsteknologi
**Eksamensdato:** 09.06.2026
**GitHub:** https://github.com/preztel/ITK2004-Eksamen-2026

---

## Situasjonsbeskrivelse

Et kontorutleiefirma leier ut kontorplasser til tre bedrifter. Firmaet trenger en
komplett IT-løsning: isolert nettverksinfrastruktur, en web-portal for kundene, og
veiledninger for daglig drift av brukere og tilganger.

---

## Oppgaveoversikt

| Oppgave | Tema | Teknologi | Mappe | Status |
|---------|------|-----------|-------|--------|
| Oppgave 1 | Utvikling — Web-løsning | Node.js, Express, MariaDB, Docker | [web/](web/) | ✅ Ferdig |
| Oppgave 2 | Drift — Nettverksdokumentasjon | Cisco Packet Tracer, VLAN, ACL | [drift/](drift/) | ✅ Ferdig |
| Oppgave 3 | Brukerstøtte — Active Directory | Active Directory, Windows Server | [brukerstotte/](brukerstotte/) | ✅ Ferdig |

---

## Oppgave 1 — Utvikling: Web-løsning

En web-løsning med offentlig markedsføringsside og innloggingsbasert kundeportal der
hver bedrift kan se sin nettverksdokumentasjon.

**Teknisk stack:** Node.js, Express, MariaDB 11, Docker Compose, bcryptjs, express-session

**Kom i gang (én kommando):**

```bash
git clone https://github.com/preztel/ITK2004-Eksamen-2026.git
cd ITK2004-Eksamen-2026/web
cp .env.example .env
docker compose up --build
```

Åpne [http://localhost:3000](http://localhost:3000)

**Testbrukere:**

| Brukernavn | Passord | Bedrift |
|------------|---------|---------|
| bedrift1 | passord123 | Bedrift AS (VLAN 10) |
| bedrift2 | passord123 | Konsulent AS (VLAN 20) |
| bedrift3 | passord123 | Design AS (VLAN 30) |

**Dokumentasjon:**
- [web/README.md](web/README.md) — oppstartsguide og API-oversikt
- [web/DATABASE.md](web/DATABASE.md) — tabellstruktur og ER-diagram

---

## Oppgave 2 — Drift: Nettverksdokumentasjon

VLAN-segmentert nettverk for tre isolerte bedrifter, simulert og konfigurert i Cisco Packet Tracer.

**Topologi:**

```
[Bedrift 1: PC0, PC1, Printer0]  — VLAN 10 — 192.168.10.0/24
[Bedrift 2: PC2, PC3, Printer1]  — VLAN 20 — 192.168.20.0/24
[Bedrift 3: PC4, PC5, Printer2]  — VLAN 30 — 192.168.30.0/24
[Server0]                         — VLAN 99 — 192.168.99.0/24
                    |
               [Switch0]  ←→  [Router0]
              Cisco 2960      Cisco 2911
```

**Bekreftet isolasjon:**
- PC0 → PC1 (VLAN 10 → 10): 4/4 Reply ✅
- PC0 → PC2 (VLAN 10 → 20): Request timed out ✅

**Dokumentasjon:**
- [drift/README.md](drift/README.md) — oversikt
- [drift/nettverk-skisse.md](drift/nettverk-skisse.md) — ASCII-topologi og enheter
- [drift/subnett-plan.md](drift/subnett-plan.md) — IP-plan og VLAN-tabell
- [drift/brannmur-portstyring.md](drift/brannmur-portstyring.md) — ACL og brannmurregler
- [drift/oppsett-veiledning.md](drift/oppsett-veiledning.md) — CLI-veiledning for tekniker
- [oppgaver/kontorutleie.pkt](oppgaver/kontorutleie.pkt) — ferdig Packet Tracer-fil

---

## Oppgave 3 — Brukerstøtte: Active Directory

Brukervennlige veiledere for ansatte uten teknisk bakgrunn som administrerer brukere og tilganger.

**Dokumentasjon:**
- [brukerstotte/README.md](brukerstotte/README.md) — oversikt
- [brukerstotte/ad-opprett-bruker.md](brukerstotte/ad-opprett-bruker.md) — opprette ny bruker
- [brukerstotte/ad-mappe-filtilgang.md](brukerstotte/ad-mappe-filtilgang.md) — gi og fjerne tilgang
- [brukerstotte/ad-vanlige-feil.md](brukerstotte/ad-vanlige-feil.md) — feilsøking

---

## AI-bruk

Se [dokumentasjon/ai-bruk.md](dokumentasjon/ai-bruk.md) for fullstendig dokumentasjon:
konkrete spørringer, utdrag av svar, metodikk og refleksjon.

**Verktøy:** Claude Code (Anthropic, claude-sonnet-4-6)
**Brukt til:** Nettverksveiledning, web-utvikling, dokumentasjon, bildeanalyse, presentasjon

---

## Kilder

Se [dokumentasjon/kilder.md](dokumentasjon/kilder.md) for fullstendig kildeliste med URL og dato.

---

## Prosjektstruktur

```
ITK2004-Eksamen-2026/
├── web/                    # Oppgave 1 — Node.js web-løsning
│   ├── docker-compose.yml
│   ├── server.js
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   ├── public/
│   ├── README.md
│   └── DATABASE.md
├── drift/                  # Oppgave 2 — Nettverksdokumentasjon
│   ├── nettverk-skisse.md
│   ├── subnett-plan.md
│   ├── brannmur-portstyring.md
│   └── oppsett-veiledning.md
├── brukerstotte/           # Oppgave 3 — AD-veiledere
│   ├── ad-opprett-bruker.md
│   ├── ad-mappe-filtilgang.md
│   └── ad-vanlige-feil.md
├── oppgaver/               # Packet Tracer-fil
├── bilder/                 # Dokumentasjonsbilder fra eksamen
├── dokumentasjon/          # Logg, AI-bruk, kilder
└── README.md
```
